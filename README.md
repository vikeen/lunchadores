lunchadores v0.2.2
==================

Randomized Lunch Selector. Application code structure is based off of yeoman's [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack). Utilize these tools and additional generators to make your development life easier.

**Demo**  
http://lunchadores.com/

## Development Startup

##### Install Dependencies
  - Install node modules. `npm install`
  - Install bower modules. `bower install`
  - Install postgres. `brew install postgres`

##### Bootstrap Processes
  - postgres
    1. `CREATE DATABASE lunchadores_dev;`
    2. `CREATE DATABASE lunchadores_test;`
    3. `CREATE ROLE lunchadores_user WITH PASSWORD 'foodie' LOGIN;`
    4. `GRANT ALL ON DATABASE lunchadores_dev TO lunchadores_user;`
    5. `GRANT ALL ON DATABASE lunchadores_test TO lunchadores_user;`
  - Move to the root of the repo and migrate your database. 'grunt migrate'. Refer to grunt-db-migrate and db-migrate docs for more details on this.

  - `grunt serve`
  - go to [http://localhost:9000](http://localhost:9000)

## Production Deployment
- run test suite. `grunt test:server`.
- confirm all your changes with `grunt serve:dist`. This will use production versions of everything including a non-seeded database.
- commit your updates. `git commit`
- push to github. `git push origin master`
- push to heroku. `grunt buildcontrol:heroku`
- migrate production if needed. `heroku run db-migrate up`
- verify changes are in place on [production](http://lunchadores.com/)
