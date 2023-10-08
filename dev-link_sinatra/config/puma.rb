# workers ENV.fetch('WEB_CONCURRENCY') { 2 }
# threads_count = ENV.fetch('MAX_THREADS') { 5 }
# threads threads_count, threads_count

preload_app!

rackup      'config.ru'
port        ENV['PORT']     || 4567
environment ENV['RACK_ENV'] || 'development'

# Enable code reloading in development
if ENV['RACK_ENV'] == 'development'
    workers 0
    before_fork do
      require 'rack/handler'
      Rack::Handler::WEBrick.shutdown
    end
end