require './app'  # Specify the path to your main Sinatra application file (app.rb)

set :protection, :origin_whitelist => ['http://localhost:5173']

run Sinatra::Application
