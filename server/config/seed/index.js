/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _ = require('lodash'),
  fs = require('fs'),
  Promise = require('bluebird'),
  path = require('path'),
  models = require('../../models/index');

module.exports = function (callback) {
  return _seedDatabaseTable(models.user, 'users').then(function () {
    return _seedDatabaseTable(models.password_reset, 'password-resets').then(function () {
      return _seedDatabaseTable(models.restaurant, 'restaurants').then(function () {
        return _seedDatabaseTable(models.tag, 'tags').then(function () {
          return _seedDatabaseTable(models.restaurant_tag, 'restaurants-tags').then(function () {
            console.log('finished seeding database');
            if (_.isFunction(callback)) {
              callback();
            }
          });
        });
      });
    });
  });
};

function _errorHandler(err) {
  console.log('');
  console.log('==============================');
  console.error(err);
  console.log('==============================');
  console.log('');

  throw err;
}

function _getJSONFileData(fileName) {
  var jsonData = fs.readFileSync(path.join(__dirname, fileName + '.json'), 'utf8');
  return JSON.parse(jsonData);
}

function _seedDatabaseTable(model, seedFileName) {
  return model.findAll().then(function () {
    return model.destroy({where: {}}).then(function () {
      return model.bulkCreate(_getJSONFileData(seedFileName), {individualHooks: true})
        .then(function (password_resets) {
          console.log('finished populating', seedFileName);
          return Promise.resolve();
        }).catch(_errorHandler);
    });
  });
}
