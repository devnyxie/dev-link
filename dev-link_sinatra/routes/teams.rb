require 'sinatra'
require 'sequel'
require_relative '../config/db'
require_relative 'users'
require_relative 'members'
require_relative 'queries'

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
      members: members_with_users,
      open_roles: open_roles
    }
  end

  def members_with_users
    members_with_users = self.members.select { |member| member[:user_id] }
    members_with_users.map do |member|
      user = self.users.find { |u| u[:id] == member[:user_id] }
      {
        member_id: member[:id],
        team_id: member[:team_id],
        user_id: member[:user_id],
        role: member[:role],
        username: user ? user[:username] : nil,
        pfp: user ? user[:pfp] : nil
      }
    end
  end

  def open_roles
    open_roles = self.members.reject { |member| member[:user_id] }
    open_roles.map do |member|
      {
        member_id: member[:id],
        team_id: member[:team_id],
        user_id: nil,
        role: member[:role]
      }
    end
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

def extract_changed_data(team, new_team_data)
  data_to_change = {}
  if team
    team_columns = Team.columns

    team_columns.each do |column|
      if new_team_data.key?(column.to_s) && team[column] != new_team_data[column.to_s]
        data_to_change[column] = new_team_data[column.to_s]
      end
    end
  end
  data_to_change
end

#get feed
get '/feed' do
  limit = params['limit']
  offset = params['offset']
  # perfectly working sequel version
  team_data = Team.order(Sequel.desc(:created_at)).limit(limit, offset).eager(:members, :users).all
  team_json_data = team_data.map do |team|
    team.fill_data
  end
  content_type :json
  team_json_data.to_json
end

#teams of specific user
get '/teams/user_id/:user_id' do
  # Raw SQL: DB[SELECT_TEAMS_BY_MEMBER_USER_ID, params[:user_id]]
  user_id = params[:user_id]
  team_data = Team.eager(:members, :users).where(id: Member.where(user_id: user_id).select(:team_id)).all
  teams = team_data.map do |team|
    team.fill_data
  end
  content_type :json
  teams.to_json
end

# GET endpoint to get a team by ID
get '/teams/:team_id' do
  team = Team.where(Sequel[:teams][:id] => params[:team_id]).eager_graph(:members, :users).all
  if team
    team_data = team[0].fill_data
    content_type :json
    team_data.to_json
  else
    status 404
    'Team not found'
  end
end

# DELETE endpoint to delete a team by ID
delete '/teams/:team_id' do
  # Find the team by ID
  team = Team.where(Sequel[:teams][:id] => params[:team_id]).first
  if team
    # Delete the team
    team.destroy
    # Return a success message
    status 204 # No Content
  else
    status 404
    'Team not found'
  end
end

#create team
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
    member.delete("member_id")
  end
  if new_team_data
    new_team = Team.create(new_team_data)
    if new_team
      members_with_team_id = members.map do |member|
        # member.delete("id")
        member["team_id"] = new_team[:id]
        member
      end
      result = Member.multi_insert(members_with_team_id)
      if result
        puts "RESULT OF MULTI INSERT:"
        puts result
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

#join or leave
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

#kick user
put '/teams/kick' do
  #we need:
  #team_id
  #member_id
  begin
    request_data = JSON.parse(request.body.read)
    puts request_data
    team_id = request_data["team_id"]
    member_id = request_data["member_id"]

    unless team_id && member_id
      content_type :json
      status 400
      return { message: "Both team_id, member_id and token are required" }.to_json
    end

    member = Member.where(id: member_id).returning().first
    unless member
      content_type :json
      status 404
      return { message: "No member with such id" }.to_json
    end
    member.update(user_id: nil)
    team = Team.where(Sequel[:teams][:id] => member[:team_id]).first
    content_type :json
    status 200
    team.fill_data.to_json
  rescue => e
    content_type :json
    status 404
    return { message: "Error: #{e}" }.to_json
  end
end

#update team
put '/teams/:team_id' do
  begin
    request_data = JSON.parse(request.body.read)
    puts request_data
    team = Team.where(id: params[:team_id]).returning().first
    data_to_change = extract_changed_data(team.fill_data, request_data)
    unless team && data_to_change
      content_type :json
      status 404
      return { message: "An error occured" }.to_json
    end
    team.update(data_to_change)
    content_type :json
    status 200
    team.fill_data.to_json
  rescue => e
    content_type :json
    status 404
    return { message: "Error: #{e}" }.to_json
  end
end