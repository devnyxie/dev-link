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
      members: detectTakenRoles,
      max_members: self.members.count
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

get '/feed' do
  from = params[:from] ? params[:from] : 0
  to = params[:to] ? params[:to] : 10
  # teams = Team.eager_graph(:users, :members).order(Sequel.desc(:created_at)).limit(to, from).all   --- temporary disabled
  teams = Team.eager(:users, :members).order(Sequel.desc(:created_at)).limit(to, from).all
  if teams.any?
    teams_data = teams.map(&:fill_data)
    content_type :json
    teams_data.to_json
  else
    status 404
    'No teams found'
  end
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


#POST A NEW TEAM
post '/teams' do
  new_team_data = JSON.parse(request.body.read)
  team_size = params['team_size'] || 5
  # * ADD CUSTOM ROLES VIA UI
  if new_team_data
    new_team = Team.create(new_team_data)
    if new_team
      #create not just one member, but create as many members as team size is. 
      members_data = [
        {team_id: new_team[:id], user_id: new_team_data["creator_id"]},
      ]
      (team_size - 1).times do
        members_data << {team_id: new_team[:id], user_id: nil}
      end
      result = Member.multi_insert(members_data)
      # new_member = Member.create({team_id: new_team[:id], user_id: new_team_data["creator_id"]})
      if result
        status 201 # Created
        new_team.fill_data
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




