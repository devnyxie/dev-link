# Start options:

### Testing:

`$ rake start`

<p>(Runs tests and then starts the application)</p>

### Development:

`$ rerun --pattern="\*_/_.rb" "bundle exec puma -C config/puma.rb"`

<p>(Starts the application via Puma with hot-reload)</p>

### Production:

`$ puma -C config/puma.rb"`

<p>(Starts the application via Puma)</p>
