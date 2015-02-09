'use strict';

var url = require('url'),
    redis = require('redis');

var Client = function() {
  this.client = undefined;

  if (process.env.REDISTOGO_URL) {
    var rtg = url.parse(process.env.REDISTOGO_URL);
    this.client = redis.createClient(rtg.port, rtg.hostname);

    this.client.auth(rtg.auth.split(':')[1]);
  } else {
    this.client = redis.createClient();
  }

  return this.client;
}

module.exports = {
  create: function() {
    return new Client();
  }
}
