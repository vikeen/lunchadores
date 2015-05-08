'use strict';

var path = require('path');
var _ = require('lodash');

function requiredProcessEnv(name) {
  if(!process.env[name]) {
    throw new Error('You must set the ' + name + ' environment variable');
  }
  return process.env[name];
}

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
  userRoles: ['guest', 'user', 'admin'],

  // Postmark Email uuid
  postmark: {
    clientId: '62067ddc-f6ef-48bd-8a71-5654e609bdf4'
  },

  robotEmail: "robot@lunchadores.com",

  // MongoDB connection options
  mongo: {
    options: {
      db: {
        safe: true
      }
    }
  },

  // Postgres connection options
  postgres: {
    options: {
      db: {
        safe: true
      }
    }
  }

};

// Export the config object based on the NODE_ENV
// ==============================================
module.exports = _.merge(
  all,
  require('./' + process.env.NODE_ENV + '.js') || {});
