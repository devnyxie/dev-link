require 'sinatra'
require 'sequel'
require_relative 'db'
require_relative 'users'


#Team
class Team < Sequel::Model(:teams)
  many_to_many :users, join_table: :members
  many_to_one :creator, class: :User, key: :creator_id
  def fill_data
    {
      id: self.id,
      name: self.name,
      # creator_id: self.creator_id,
      creator: self.creator ? { id: self.creator.id, pfp: self.creator.pfp } : nil, # Include creator info if available
      description_short: self.description_short,
      description_md: self.description_md,
      open: self.open,
      created_at: self.created_at.strftime("%Y-%m-%dT%H:%M:%S.%LZ"),
      members: self.users.map { |user| { id: user.id, pfp: user.pfp } }
    }
  end
end

get '/feed' do
  from = params[:from] ? params[:from] : 0
  to = params[:to] ? params[:to] : 10
  teams = Team.eager(:users, :creator).order(Sequel.desc(:created_at)).all
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
  puts "New team req: #{new_team_data}"
  if new_team_data
    new_team = Team.create(new_team_data)
    if new_team
      status 201 # Created
      new_team.fill_data
      content_type :json
      new_team.to_json
    else
      status 400 # Bad Request
      { error: "Error, can't create new team." }.to_json
    end
  else
    status 400 # Bad Request
    { error: "Error, can't create new team." }.to_json
  end
end
