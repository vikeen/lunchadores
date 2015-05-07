'use strict';

var express = require('express'),
  router = express.Router(),
  controller = require('./restaurant.controller'),
  validators = require('./restaurant.validators'),
  auth = require('../../auth/auth.service'),
  requestHandler = require('../../components/helpers').requestHandler;

router.get('/', function (req, res) {
  if (req.query.active === "true") {
    if (req.query.distance && req.query.lat && req.query.lng) {
      controller.getActiveRestaurantsByLocation({
        lat: req.query.lat,
        lng: req.query.lng
      }, req.query.distance, requestHandler(req, res));
    } else {
      controller.getActiveRestaurants(requestHandler(req, res));
    }
  } else {
    controller.getAllRestaurants(requestHandler(req, res));
  }
});

router.get('/:id', validators.hasValidIdParam, function (req, res) {
  controller.getRestaurantById(req.params.id, requestHandler(req, res));
});

router.post('/', auth.hasRole('admin'), function (req, res) {
  controller.createRestaurant(req.body, requestHandler(req, res));
});

router.post('/:id/rate/:rating', validators.hasValidIdParam, validators.hasValidRatingParam, auth.hasRole('user'), function (req, res) {
  controller.rateRestaurant(req.user.id, req.params.id, req.params.rating, requestHandler(req, res));
});

router.put('/:id', validators.hasValidIdParam, auth.hasRole('admin'), function (req, res) {
  controller.updateRestaurant(req.body, requestHandler(req, res));
});

router.patch('/:id', validators.hasValidIdParam, auth.hasRole('admin'), function (req, res) {
  controller.updateRestaurant(req.body, requestHandler(req, res));
});

router.delete('/:id', validators.hasValidIdParam, auth.hasRole('admin'), function (req, res) {
  controller.deleteRestaurant(req.params.id, requestHandler(req, res));
});

module.exports = router;
