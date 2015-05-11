/**
 * Main application models
 */

'use strict';

var _ = require('lodash'),
  config = require('./config/environment'),
  models = null;

function setup(db, callback) {
  require('./api/password-reset/password-reset.model')(db);
  require('./api/restaurant/restaurant.model')(db);
  require('./api/user/user.model')(db);

  models = db.models;
  callback(null, db.models);
}

module.exports = function (db, callback) {
  if (models) {
    return (_.isFunction(callback)) ? callback(null, models) : models;
  }

  setup(db, callback);
};
