'use strict';

var _ = require('lodash'),
    models = require('../../models')();

// Get list of restaurants
function index(req, res) {
  models.restaurant.find({active: true},
    function (err, restaurants) {
      if(err) { return handleError(res, err); }
      return res.json(200, restaurants);
    });
}

// Get a single restaurant
function show(req, res) {
  models.restaurant.get(req.params.id, function (err, restaurant) {
    if(err) { return handleError(res, err); }
    if(!restaurant) { return res.send(404); }
    return res.json(restaurant);
  });
}

// Creates a new restaurant in the DB.
function create(req, res) {
  req.body.active = true;
  req.body.rating = 0;

  models.restaurant.create(req.body, function(err, restaurant) {
    if(err) { return handleError(res, err); }
    return res.json(201, restaurant);
  });
}

// Updates an existing restaurant in the DB.
function update(req, res) {
  models.restaurant.get(req.params.id, function (err, restaurant) {
    if (err) { return handleError(res, err); }
    if(!restaurant) { return res.send(404); }
    var updated = _.merge(restaurant, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, restaurant);
    });
  });
}

// Deletes a restaurant from the DB.
function destroy(req, res) {
  models.restaurant.get(req.params.id, function (err, restaurant) {
    if(err) { return handleError(res, err); }
    if(!restaurant) { return res.send(404); }
    restaurant.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
}

// Rate the restaurant
function rateRestaurant(req, res) {
  //restaurantRatingQueue.publish(JSON.stringify({
  //  user_id: req.user.id,
  //  restaurant_id: req.params.id,
  //  rating: req.params.rating
  //}));
  //
  //return res.send(201);
}

function handleError(res, err) {
  return res.send(500, err);
}

module.exports = {
  rateRestaurant: rateRestaurant,
  index: index,
  show: show,
  create: create,
  update: update,
  destroy: destroy
};
