'use strict';

var Sequelize = require('sequelize'),
  path = require('path'),
  config = require('../config/environment')(),
  sequelize = new Sequelize(config.database.uri, {
    logging: false
  }),
  db = {};

var models = [
  '../api/restaurant/restaurant.model',
  '../api/user/user.model',
  '../api/password-reset/password-reset.model',
  '../api/tag/tag.model',
  '../api/restaurant-tag/restaurant-tag.model'
];

models.forEach(function(model) {
  model = sequelize['import'](path.join(__dirname, model));
  db[model.name] = model;
});

Object.keys(db).forEach(function (modelName) {
  if ('associate' in db[modelName]) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
