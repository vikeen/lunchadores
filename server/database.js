"use strict";

var orm = require("orm"),
    config = require('./config/environment');

var connection = null;

module.exports = {
  connect: connect
};

function connect(callback) {
  if (connection) {
    callback(connection);
    return connection;
  }

  return orm.connect(config.postgres.uri, function(err, db) {
    if (err) {
      return console.error('Connection error: ' + err);
    }

    if (callback) {
      callback(db);
      connection = db;
    }
  });
}
