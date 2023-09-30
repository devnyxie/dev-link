require 'sinatra'
require 'sequel'
require_relative 'db'
class Member < Sequel::Model(:members)
  many_to_one :team, key: :team_id
  unrestrict_primary_key
  def fill_data
    {
      team_id: self.team_id,
      user_id: self.user_id,
      id: self.id
    }
  end
end
