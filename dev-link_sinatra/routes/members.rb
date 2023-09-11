require 'sinatra'
require 'sequel'
require_relative 'db'
class Member < Sequel::Model(:members)
  set_primary_key [:team_id, :user_id] # Set the primary key explicitly
  unrestrict_primary_key
  #table to connect users and teams
  def fill_data
    {
      team_id: self.team_id,
      user_id: self.user_id
    }
  end
end

#join a team by creating a member
#1. check if user is creator
#if already a member/creator -> bad req (400) with a message
#if all -> create a member by user_id and team_id
post '/join' do
  team_id = params[:team_id]
  user_id = params[:user_id]
  # new_member = 
  puts team_id
  puts user_id
  if team_id && user_id
    new_member = Member.create({
      team_id: team_id,
      user_id: user_id
    })
    if new_member
      status 201 # Created
      new_member.fill_data
      content_type :json
      new_member.to_json
    else
      status 400 # Bad Request
      { error: "Error, can't create new member." }.to_json
    end
  else
    status 400 # Bad Request 
    { error: "Error, can't create new member." }.to_json
  end
end


delete '/leave' do
  puts 'Leaving...'
  team_id = params[:team_id]
  user_id = params[:user_id]
  if team_id && user_id
    # Find the member record by team_id and user_id
    member = Member.where(team_id: team_id, user_id: user_id).first
    puts member

    if member
      # Delete the member record to leave the team
      member.delete
      status 204 # No Content (successful deletion)
    elsif member.nil? || member.empty?
      puts "Searching for a team..."
      team = Team.where(id: params[:team_id]).first
      puts "Comparing creator id and user id"
      if team[:creator_id] == params[:user_id]
        team.delete
        puts "\n ------------ Team deleted ------------"
        status 204
      end
    else
      status 400 # Bad Request
      { error: "Error, user is not a member of the team." }.to_json
    end

  else
    status 400 # Bad Request
    { error: "Error, missing team_id or user_id." }.to_json
  end
end
