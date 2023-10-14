require './app'  # Specify the path to your main Sinatra application file (app.rb)

set :protection, :origin_whitelist => ['https://dev-link.up.railway.app/']

run Sinatra::Application
