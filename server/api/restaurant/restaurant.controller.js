'use strict';

var _ = require('lodash');
var Restaurant = require('./restaurant.model');
var restaurantRatingQueue = require('../../redis/restaurant-ratings.queue');

// Get list of restaurants
exports.index = function(req, res) {
  Restaurant.find(function (err, restaurants) {
    if(err) { return handleError(res, err); }
    return res.json(200, restaurants);
  });
};

// Get a single restaurant
exports.show = function(req, res) {
  Restaurant.findById(req.params.id, function (err, restaurant) {
    if(err) { return handleError(res, err); }
    if(!restaurant) { return res.send(404); }
    return res.json(restaurant);
  });
};

// Creates a new restaurant in the DB.
exports.create = function(req, res) {
  Restaurant.create(req.body, function(err, restaurant) {
    if(err) { return handleError(res, err); }
    return res.json(201, restaurant);
  });
};

// Updates an existing restaurant in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Restaurant.findById(req.params.id, function (err, restaurant) {
    if (err) { return handleError(res, err); }
    if(!restaurant) { return res.send(404); }
    var updated = _.merge(restaurant, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, restaurant);
    });
  });
};

// Deletes a restaurant from the DB.
exports.destroy = function(req, res) {
  Restaurant.findById(req.params.id, function (err, restaurant) {
    if(err) { return handleError(res, err); }
    if(!restaurant) { return res.send(404); }
    restaurant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

// Rate the restaurant
exports.rateRestaurant = function(req, res) {
  restaurantRatingQueue.publish(JSON.stringify({
    user_id: req.user._id,
    restaurant_id: req.params.id,
    rating: req.params.rating
  }));

  return res.send(201);
}

function handleError(res, err) {
  return res.send(500, err);
}
