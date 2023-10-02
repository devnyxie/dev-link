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
      pfp: self.pfp,
      banner: self.banner,
      readme: self.readme,
      created_at: self.created_at.strftime("%Y-%m-%dT%H:%M:%S.%LZ")
    }
  end
end

#put endpoint --- find diff
def extract_changed_data(user, new_user_data)
  data_to_change = {}
  # Compare each attribute in new_user_data with the user object
  if user
    user_columns = User.columns  # Assuming User.columns returns an array of column names

    user_columns.each do |column|
      if new_user_data.key?(column.to_s) && user[column] != new_user_data[column.to_s]
        data_to_change[column] = new_user_data[column.to_s]
      end
    end
  end
  data_to_change
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

get '/users' do
  if params[:id]
    user = User.where(id: params[:id]).first
  elsif params[:username]
    user = User.where(username: params[:username]).first
  end
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

put '/users/:id' do
  user = User.where(id: params[:id]).first
  new_user_data = JSON.parse(request.body.read)
  data_to_change = extract_changed_data(user.fill_data, new_user_data)
  if data_to_change[:password]
    data_to_change[:password] = BCrypt::Password.create(data_to_change[:password])
  end
  puts "UPDATING USER WITH THIS DATA: #{data_to_change}"
  puts data_to_change
  # Update the task in the database
  if user && data_to_change
    user.update(
      data_to_change
    )
    user_data = user.fill_data
    content_type :json
    status 200
    user_data.to_json
  else
    status 404
    body "User with ID #{params[:id]} not found"
  end
end