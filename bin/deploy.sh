#!/usr/bin/env bash

NODE_ENV=development grunt test &&
 NODE_ENV=development grunt build &&
 NODE_ENV=development grunt buildcontrol:heroku
 cd dist && heroku run sequelize db:migrate && cd ..
