require 'rack/cors'

configure do
  use Rack::Cors do
    allow do
      origins 'https://dev-link.up.railway.app/'
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
    end
  end
end
