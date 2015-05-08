'use strict';

// Production specific configuration
// =================================
module.exports = {
  applicationUrl: 'http://www.lunchadores.com',

  // Server IP
  ip: process.env.OPENSHIFT_NODEJS_IP ||
      process.env.IP ||
      undefined,

  // Server port
  port: process.env.OPENSHIFT_NODEJS_PORT ||
        process.env.PORT ||
        8080,

  // MongoDB connection options
  //mongo: {
  //  uri: process.env.MONGOLAB_URI ||
  //       process.env.MONGOHQ_URL ||
  //       process.env.OPENSHIFT_MONGODB_DB_URL+process.env.OPENSHIFT_APP_NAME ||
  //       'mongodb://localhost/lunchadores_dev'
  //},

  postmark: {
    clientId: process.env.POSTMARK_API_KEY
  },

  postgres: {
    uri: process.env.DATABASE_URL ||
    'postgres://lunchadores_user:foodie@localhost:5432/lunchadores_dev'
  }

  //redis: process.env.REDISTOGO_URL
};
