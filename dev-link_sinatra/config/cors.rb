require 'rack/cors'
require 'dotenv'

#CORS configuration. ORIGIN = FrontEnd URL
configure do
  use Rack::Cors do
    allow do
      origins ENV['ORIGIN']
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
    end
  end
end

set :protection, :except => [:http_origin]