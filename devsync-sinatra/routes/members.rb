require 'sinatra'
require 'sequel'
require_relative 'db'
class Member < Sequel::Model(:members)
  #table to connect users and teams
end
