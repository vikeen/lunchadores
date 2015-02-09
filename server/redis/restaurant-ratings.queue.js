'use strict';

var redisClient = require('./client');

var subscriber,
    publisher,
    queue = {
      'name': 'restaurant-ratings-queue'
    };

var log = function(message) {
  console.log(queue.name + ':', message);
};

var start = function() {
  log('booting up queue');
  subscriber = subscriber || redisClient.create();
  publisher = publisher || redisClient.create();

  subscriber.on('message', function (channel, restaurantRating) {
    log('received restaurant rating >' + restaurantRating + '<');
    publisher.rpush(queue.name, restaurantRating);
  });

  subscriber.subscribe(queue.name);
};

var stop = function() {
  log('stopping queue');
  subscriber.unsubscribe();
  subscriber.end();
  publisher.end();
};

var publish = function(message) {
  publisher.publish(queue.name, message);
};

module.exports = {
  'start': start,
  'stop': stop,
  'publish': publish
};
