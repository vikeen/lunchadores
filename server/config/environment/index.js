'use strict';

var path = require('path');
var fs = require('fs');
var _ = require('lodash');

// All configurations will extend these options
// ============================================
var all = {
  env: process.env.NODE_ENV,

  // Root path of server
  root: path.normalize(__dirname + '/../../..'),

  // Server port
  port: process.env.PORT || 9000,

  // Should we populate the DB with sample data?
  seedDB: false,

  // Secret for session, you will want to change this and make it an environment variable
  secrets: {
    session: 'lunchadores-secret'
  },

  // List of user roles
  userRoles: ['user', 'admin'],

  robotEmail: "robot@lunchadores.com"
};

function getDatabaseConfig() {
  var jsonData = fs.readFileSync(path.join(__dirname,'../database.json'), 'utf8');
  var databaseConfig = JSON.parse(jsonData);

  return {database: databaseConfig[process.env.NODE_ENV]};
}

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {},
  getDatabaseConfig() || {});
