require 'sinatra'
require 'sequel'
require_relative 'db'

#USERS
class User < Sequel::Model(:users)
  many_to_many :teams, join_table: :members
  def fill_data
    {
      id: self.id,
      username: self.username,
      name: self.name,
      surname: self.surname,
      pfp: self.pfp
    }
  end
end

post '/login' do
  credentials = JSON.parse(request.body.read)
  puts "Credentials used: #{credentials}"
  user = User.where(username: credentials["username"]).first
  if user
    #encrypt entered password and compare with the one from DB
    entered_password_bcrypt = BCrypt::Password.create(credentials["password"])
    db_password_bcrypt = user.password
    puts "Entered: #{entered_password_bcrypt}, DB: #{db_password_bcrypt}"
    isPasswordTrue = BCrypt::Password.new(db_password_bcrypt) == credentials['password']
    if isPasswordTrue
      status 200
      user_data = user.fill_data
      content_type :json
      user_data.to_json
    else
      status 403
      { error: 'Wrong password' }.to_json
    end
  else
    status 403
    { error: 'No user with such username' }.to_json
  end
end

post '/register' do
  credentials = JSON.parse(request.body.read)
  puts "New user req: #{credentials}"
  if credentials
    #encrypt entered password and compare with the one from DB
    encrypted_password = BCrypt::Password.create(credentials["password"])
    credentials["password"] = encrypted_password
    new_user = User.create(credentials)
    #how to know here if action was successful?
    if new_user
      status 201 # Created
      new_user.fill_data
      content_type :json
      new_user.to_json
    else
      status 400 # Bad Request
      { error: "Error, can't register." }.to_json
    end
  else
    status 400 # Bad Request
    { error: "Error, can't register." }.to_json
  end
end

post '/users' do
  request_body = JSON.parse(request.body.read)
  user = User.new(
    username: request_body['username'],
  )
  user.password = BCrypt::Password.create(request_body['password'])
  if user.save
    status 201 # Created
    user.to_json
  else
    status 400 # Bad Request
    { error: 'User creation failed' }.to_json
  end
end

get '/users/:id' do
  user = User.where(id: params[:id]).first
  if user
    status 200
    user_data = user.fill_data
    content_type :json
    user_data.to_json
  else
    status 404
    'User not found'
  end
end
