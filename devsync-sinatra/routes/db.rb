require 'sequel'
require 'dotenv'

DB = Sequel.connect(
  adapter: ENV['PG_ADAPTER'],
  host: ENV['PG_HOST'],
  port: ENV['PG_PORT'],
  database: ENV['PG_DATABASE'],
  user: ENV['PG_USER'],
  password: ENV['PG_PASSWORD'],
)
#logs
DB.loggers << Logger.new($stdout);
