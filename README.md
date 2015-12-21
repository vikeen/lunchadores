lunchadores
==================

Randomized Lunch Selector. Application code structure is based off of yeoman's [generator-angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack).

**Demo**  
http://lunchadores.herokuapp.com/

## Development Startup

##### Install Dependencies
  - Install node modules. `npm install`
  - Install postgres. `brew install postgres`
  - Install sequelize-cli. 'npm install -g sequelize-cli'

##### Bootstrap Processes
  - postgres
    1. `CREATE DATABASE lunchadores_dev;`
    1. `CREATE DATABASE lunchadores_test;`
    1. `CREATE ROLE lunchadores_user WITH PASSWORD 'foodie' LOGIN;`
    1. `GRANT ALL ON DATABASE lunchadores_dev TO lunchadores_user;`
    1. `GRANT ALL ON DATABASE lunchadores_test TO lunchadores_user;`
  - Move to the root of the repo and migrate your database. 'sequelize db:migrate'.

  - `grunt serve`
  - go to [http://localhost:9000](http://localhost:9000)

## Production Deployment
- run test suite. `grunt test`.
- confirm all your changes with `grunt serve:dist`. This will use production versions of everything including a non-seeded database.
- commit your updates. `git commit`
- push to github. `git push origin master`
- push to heroku. `grunt buildcontrol:heroku`
- migrate production if needed. `heroku run sequelize db:migrate`
- verify changes are in place on [production](http://lunchadores.herokuapp.com/)
