
ENV['APP_ENV'] = 'test'

require_relative '../app' # <-- sinatra app
require 'rspec'
require 'rack/test'

RSpec.describe 'Dev-Link tests' do
    puts "Starting testing..."
    include Rack::Test::Methods

    def app
        Sinatra::Application
    end

    #Test's data
    teams = nil;
    #Tests
    it "GET '/feed' test" do
        get '/feed?offset=0&limit=15'
        expect(last_response).to be_ok
        teams = JSON.parse(last_response.body)
        expect(teams).to be_an(Array)
        expect(teams.count).to eq(15)
        puts "GET '/feed' tested successfully (#{teams.count}/15) ✅"
    end
    it "GET '/teams/:team_id' test" do
        team = teams[0]
        get "/teams/#{team['id']}"
        expect(last_response).to be_ok
        puts "GET '/teams/:team_id' tested successfully ✅"
    end
end