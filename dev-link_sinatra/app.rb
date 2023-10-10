require 'sinatra'
require 'pg'
require 'sequel'
require 'bcrypt'
require 'logger';
require 'dotenv'

#load env variables
Dotenv.load
#port
set :port, ENV['PORT'] || 8080

get '/' do
    # Store route information in an array of strings
    route_info = []

    # Iterate through all routes
    Sinatra::Application.routes.each do |method, route_data|
        route_data.each do |pattern, block|
          # Extract the HTTP method, route pattern, and block
          http_method = method.to_s
          path = pattern.to_s

          # Skip the root ("/") endpoint
          next if path == '/'

          route_info << "#{http_method} #{path}"
        end
      end
    @routes = route_info
    erb :homepage
    # "Welcome to Dev-Link"
end

require_relative 'routes/teams'
require_relative 'routes/users'
require_relative 'routes/members'
require_relative 'config/cors'
