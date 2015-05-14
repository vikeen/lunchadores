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

  postmark: {
    clientId: process.env.POSTMARK_API_KEY
  },

  database: {
    uri: process.env.DATABASE_URL
  }
};
