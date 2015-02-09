lunchadores v0.2.2
==================

Randomized Lunch Selector. Application code structure is based off of yeoman's [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack). Utilize these tools and additional generators to make your development life easier.

**Demo**  
http://lunchadores.com/

## Development Startup

##### Install Dependencies
  - Install node modules. `npm install`
  - Install bower modules. `bower install`
  - Install mongodb. `brew install mongodb`
  - Install redis. `brew install redis`

##### Bootstrap Processes
  - `mongod`. It's assumed that `/data/db/` exists on your machine. If not then create it or use a relative database `mongod --dbpath data/db`
  - `redis-server`
  - `grunt serve`
  - go to [http://localhost:9000](http://localhost:9000)

## Production Deployment
- confirm all your changes with `grunt serve:dist`. This will use production versions of everything including a non-seeded database.
- commit your updates. `git commit`
- push to github. `git push origin master`
- deploy to production environment. `./bin/deploy.sh`. This is just a wrapper for `git build && git buildcontrol:heroku`
- verify changes are in place on [production](http://lunchadores.com/)
