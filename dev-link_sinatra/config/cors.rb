require 'rack/cors'

configure do
  use Rack::Cors do
    allow do
      origins 'http://localhost:5173'
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]
    end
  end
end
