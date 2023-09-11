require 'rack/cors'

configure do
  use Rack::Cors do
    allow do
      # Whitelist specific origins by adding them to the `origins` array.
      # "*" allows any origin. You should replace it with specific domains.
      origins '*'

      # Set the HTTP methods you want to allow.
      resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options]

      # You can also specify additional headers and expose headers if needed.
      # headers 'X-Requested-With' => 'XMLHttpRequest'
      # expose ['Some-Header']
    end
  end
end
