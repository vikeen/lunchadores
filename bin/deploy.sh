#!/usr/bin/env bash

grunt test &&
 grunt build &&
 grunt buildcontrol:heroku
 cd dist && heroku run sequelize db:migrate && cd ..
