require 'sinatra'
require 'sequel'
require_relative 'db'
require_relative 'users'
require_relative 'members'
require_relative 'queries'


#Team
class Team < Sequel::Model(:teams)
  one_to_many :members, key: :team_id
  many_to_many :users, join_table: :members

  def fill_data
    {
      id: self.id,
      name: self.name,
      creator_id: self.creator_id,
      description_short: self.description_short,
      description_md: self.description_md,
      open: self.open,
      created_at: self.created_at.strftime("%Y-%m-%dT%H:%M:%S.%LZ"),
      members: detectTakenRoles,
    }
  end

  private

  def detectTakenRoles
    combined_members = []
    self.members.each do |member|
      if member[:user_id]
        user = self.users.find { |u| u[:id] == member[:user_id] }
        if user
          combined_member = {
            team_id: member[:team_id],
            role: member[:role],
            id: member[:id],
            user_id: member[:user_id],
            user: user.fill_data
          }
          combined_members << combined_member
        else
          combined_members << { role: member[:role], user_id: member[:user_id] }
        end
      else
        combined_members << { role: member[:role], user_id: member[:user_id] }
      end
    end
    combined_members
  end
end

def fill_data_raw(teams)
  data = []

  teams.each do |row|
    team_id = row[:team_id]
    member = {
      member_id: row[:member_id],
      user_id: row[:user_id],
      username: row[:username],
      pfp: row[:pfp],
      name: row[:name],
      surname: row[:surname],
      role: row[:role]
    }

    team = data.find { |t| t[:id] == team_id }

    unless team
      team = {
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
      data << team
    end

    if member[:user_id].nil?
      puts member[:username]
      team[:open_roles] << member
    else
      team[:members] << member
    end
  end

  data
end



get '/feed' do
  limit = params['limit'] || 3
  offset = params['offset'] || 0
  # team_data = DB[SELECT_TEAMS_v2]
  team_data = DB[SELECT_TEAMS_v3, offset: offset.to_i, limit: limit.to_i]
  puts team_data
  team_structure = fill_data_raw(team_data)
  content_type :json
  team_structure.to_json
end


get '/teams/:team_id' do
  team = DB[SELECT_TEAM_BY_ID_v2, params[:team_id]]
  if team
    team_data = fill_data_raw(team)
    content_type :json
    team_data[0].to_json
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

put '/teams/join_or_leave' do
  begin
    request_data = JSON.parse(request.body.read)
    user_id = request_data["user_id"]
    member_id = request_data["member_id"]

    unless user_id && member_id
      content_type :json
      status 400
      return { message: "Both user_id and member_id are required" }.to_json
    end

    updated_member = Member.where(id: member_id).returning().first
    unless updated_member
      content_type :json
      status 404
      return { message: "No member with such id" }.to_json
    end
    updated_member.update(user_id: updated_member[:user_id] == user_id ? nil : user_id)
    updated_member = {
      user_id: updated_member[:user_id],
      team_id: updated_member[:team_id],
    }
    content_type :json
    status 200
    updated_member.to_json
  rescue Sequel::UniqueConstraintViolation => e
    # Handle the unique constraint violation error
    content_type :json
    status 409 # Conflict status code for duplicate resource
    return { message: "Duplicate user_id and team_id pair" }.to_json
  rescue JSON::ParserError => e
    content_type :json
    status 400
    return { message: "Invalid JSON data in the request body" }.to_json
  end
end
