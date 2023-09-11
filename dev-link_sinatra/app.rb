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

# Your Sinatra routes and application logic go here.


require_relative 'routes/teams'
require_relative 'routes/users'
require_relative 'routes/members'
require_relative 'config/cors'




















