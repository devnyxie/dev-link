require 'sinatra'
require 'sequel'
require_relative 'db'
require_relative 'users'
require_relative 'members'


#Team
class Team < Sequel::Model(:teams)
  one_to_many :members, key: :team_id
  many_to_many :users, join_table: :members

  def fill_data
    puts "#{self.id} --- USERS: #{self.users.count}, MEMBERS: #{self.members.count}"
    {
      id: self.id,
      name: self.name,
      creator_id: self.creator_id,
      description_short: self.description_short,
      description_md: self.description_md,
      open: self.open,
      created_at: self.created_at.strftime("%Y-%m-%dT%H:%M:%S.%LZ"),
      current_members_count: self.users.count,
      max_members_count: self.members.count,
      members: detectTakenRoles
    }
  end

  # private

  # def detectTakenRoles
  #   combined_members = []

  #   self.members.each do |member|

  #     if member[:user_id]
  #       user = self.users.find { |u| u[:id] == member[:user_id] }
  #       if user
  #         combined_member = {
  #           id: member[:id],
  #           team_id: member[:team_id],
  #           user_id: member[:user_id],
  #           role: member[:role],
  #           pfp: user[:pfp],
  #           name: user[:name],
  #           surname: user[:surname],
  #           username: user[:username]
  #         }
  #         combined_members << combined_member
  #       else
  #         combined_members << { role: member[:role], user_id: member[:user_id] }
  #       end
  #     else
  #       combined_members << { role: member[:role], user_id: member[:user_id] }
  #     end
  #   end

  #   combined_members
  # end
end

# get '/feed' do
#   from = params[:from] ? params[:from] : 0
#   to = params[:to] ? params[:to] : 10
#   # teams = Team.eager_graph(:users, :members).order(Sequel.desc(:created_at)).limit(to, from).all   --- temporary disabled
#   teams = Team.eager(:users, :members).order(Sequel.desc(:created_at)).limit(to, from).all
#   if teams.any?
#     teams_data = teams.map(&:fill_data)
#     content_type :json
#     teams_data.to_json
#   else
#     status 404
#     'No teams found'
#   end
# end

# get '/feed_v2' do
#   def build_team_structure
#     teams = {}
  
#     query = <<-SQL
#       SELECT *
#       FROM teams t
#       INNER JOIN members m ON t.id = m.team_id
#       LEFT OUTER JOIN users u ON u.id = m.user_id
#     SQL
  
#     DB[query].each do |row|
#       team_id = row[:team_id]
#       member = {
#         id: row[:id],
#         user_id: row[:user_id],
#         username: row[:username],
#         password: row[:password],
#         pfp: row[:pfp],
#         name: row[:name],
#         surname: row[:surname]
#       }
#       if teams.key?(team_id)
#         if member[:user_id].nil?
#           teams[team_id][:available_roles] << member
#         else
#           teams[team_id][:members] << member
#         end
#       else
#         teams[team_id] = {
#           id: row[:id],
#           name: row[:name],
#           creator_id: row[:creator_id],
#           description_short: row[:description_short],
#           description_md: row[:description_md],
#           open: row[:open],
#           created_at: row[:created_at],
#           members: [member],
#           available_roles: [member]
          
#         }
#       end
#     end
#     teams.values
#   end
  
#   team_structure = build_team_structure
  
#   content_type :json
#   team_structure.to_json
# end

get '/feed' do


  def build_team_structure
    limit = params['limit'] || 15  # Default to 10 if limit is not provided
    offset = params['offset'] || 0  # Default to 0 if offset is not provided
  
    teams = {}

    query = <<-SQL
      SELECT 
        teams_with_members.id AS team_id,
        teams_with_members.name AS team_name,
        teams_with_members.creator_id,
        teams_with_members.description_short,
        teams_with_members.description_md,
        teams_with_members.open,
        teams_with_members.created_at AS team_created_at,
        u.id AS user_id,
        u.name,
        u.surname,
        u.username,
        u.pfp,
        m.role
      FROM (
        SELECT t.id, t.name, t.creator_id, t.description_short, t.description_md, t.open, t.created_at
        FROM teams t
        INNER JOIN members m ON t.id = m.team_id
        LEFT OUTER JOIN users u ON u.id = m.user_id
        GROUP BY t.id
      ) AS teams_with_members
      LEFT OUTER JOIN members m ON teams_with_members.id = m.team_id
      LEFT OUTER JOIN users u ON u.id = m.user_id
      ORDER BY created_at DESC
    SQL


    DB[query].each do |row|
      team_id = row[:team_id]
      member = {
        id: row[:user_id],
        username: row[:username],
        pfp: row[:pfp],
        name: row[:name],
        surname: row[:surname],
        role: row[:role]
      }
      unless teams.key?(team_id)
        teams[team_id] = {
          id: row[:team_id],
          name: row[:team_name],
          creator_id: row[:creator_id],
          description_short: row[:description_short],
          description_md: row[:description_md],
          open: row[:open],
          created_at: row[:team_created_at].strftime("%Y-%m-%dT%H:%M:%S.%LZ"),
          members: [],
          open_roles: []
        }
      end
      
      if member[:id].nil?
        teams[team_id][:open_roles] << member
      else
        teams[team_id][:members] << member
      end
    end
    teams.values
  end

  team_structure = build_team_structure

  content_type :json
  team_structure.to_json
end

get '/teams/:team_id' do
  team = Team.eager(:users, :creator).where(id: params[:team_id]).first
  if team
    team_data = team.fill_data
    content_type :json
    team_data.to_json
  else
    status 404
    'Team not found'
  end
end


post '/teams' do
  data = JSON.parse(request.body.read)
  puts data.inspect
  #assign members to a variable
  members = data['members']
  #del members from data hash
  data.delete('members')
  puts "Members: #{members}"
  new_team_data = data
  puts "Team data: #{new_team_data}"
  members.each do |member|
    member.delete("id")
  end
  if new_team_data
    new_team = Team.create(new_team_data)
    if new_team
      members_with_team_id = members.map do |member|
        member.delete("id")
        member["team_id"] = new_team[:id]
        member
      end
      result = Member.multi_insert(members_with_team_id)
      if result
        status 201 # Created
        content_type :json
        new_team.to_json
      end
    else
      status 400 # Bad Request
      { error: "Error, can't create new team." }.to_json
    end
  else
    status 400 # Bad Request
    { error: "Error, can't create new team." }.to_json
  end
end


