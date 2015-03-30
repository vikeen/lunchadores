/**
 * Main application models
 */

'use strict';

var config = require('./config/environment'),
    models = null;

function setup(db) {
  require('./api/restaurant/restaurant.model')(db);
  require('./api/user/user.model')(db);

  models = db.models;
  return db.models;
}

module.exports = function(db) {
  if (models) return models;

  return setup(db);
};
