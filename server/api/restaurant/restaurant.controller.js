'use strict';

var _ = require('lodash'),
  models = require('../../models')();

module.exports = {
  createRestaurant: createRestaurant,
  deleteRestaurant: deleteRestaurant,
  getActiveRestaurants: getActiveRestaurants,
  getAllRestaurants: getAllRestaurants,
  getRestaurantById: getRestaurantById,
  rateRestaurant: rateRestaurant,
  updateRestaurant: updateRestaurant
};

// Get list of restaurants
function getActiveRestaurants(callback) {
  models.restaurant.find({active: true}, callback);
}

// Get list of restaurants
function getAllRestaurants(callback) {
  models.restaurant.find({}, callback);
}

// Get a single restaurant
function getRestaurantById(id, callback) {
  models.restaurant.get(id, callback);
}

// Creates a new restaurant in the DB.
function createRestaurant(payload, callback) {
  payload.active = true;
  payload.rating = 0;
  models.restaurant.create(payload, callback);
}

// Updates an existing restaurant in the DB.
function updateRestaurant(payload, callback) {
  models.restaurant.get(payload.id, function (err, restaurant) {
    var updated = _.merge(restaurant, payload);
    updated.save(callback);
  });
}

// Deletes a restaurant from the DB.
function deleteRestaurant(restaurantId, callback) {
  models.restaurant.find({id: restaurantId}).remove(callback);
}

// Rate the restaurant
function rateRestaurant(userId, restaurantId, rating, callback) {
}
