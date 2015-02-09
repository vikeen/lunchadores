'use strict';

var _ = require('lodash');

var queues = {
  restaurantRatings: require('./restaurant-ratings.queue')
};

module.exports = {
  startQueues: function() {
    _.each(queues, function(queue) {
      queue.start();
    });
  },
  stopQueues: function() {
    _.each(queues, function(queue) {
      queue.stop();
    });
  },
  queues: queues
}
