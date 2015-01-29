lunchadores v0.2.2
==================

Randomized Lunch Selector. Application code structured is based off of yeoman [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack). Utilize these tools and additional generators to make your development life easier.

**Demo**  
http://lunchadores.herokuapp.com/

## Development Startup

##### Install Dependencies
  - Install node modules. `npm install`
  - Install bower modules. `bower install`
  - Install mongodb. `brew install mongodb`

##### Bootstrap Processes
  - `mongod --dbpath data/db`. Use a relative path to your cloned source code. Create this directory if it doesn't exist. Using a root level path of `/data/db` is fine as well.
  - `grunt serve`
  - go to [http://localhost:9000](http://localhost:9000)

## Production Deployment
- confirm all your changes with `grunt serve:dist`
- commit your updates. `git commit`
- push to github. `git push origin master`
- deploy to production environment. `git push heroku master`
- verify changes are in place on [production](http://lunchadores.herokuapp.com/)
