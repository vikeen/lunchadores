'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  //mongo: {
  //  uri: 'mongodb://localhost/lunchadores_dev'
  //},

  applicationUrl: 'http://localhost:9000',

  // Postmark Email uuid
  postmark: {
    clientId: 'POSTMARK_API_TEST'
  },

  // Postgres connection options
  postgres: {
    uri: 'postgres://lunchadores_user:foodie@localhost:5432/lunchadores_dev'
  },

  seedDB: true
};
