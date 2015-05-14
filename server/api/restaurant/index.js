'use strict';

var express = require('express'),
  router = express.Router(),
  controller = require('./restaurant.controller'),
  validators = require('./restaurant.validators'),
  auth = require('../../auth/auth.service'),
  handlers = require('../../components/helpers').handlers;

router.get('/', function (req, res) {
  if (req.query.active === "true") {
    if (req.query.distance && req.query.lat && req.query.lng) {
      handlers.request(controller.getActiveRestaurantsByLocation({
        lat: req.query.lat,
        lng: req.query.lng
      }, req.query.distance), req, res);
    } else {
      handlers.request(controller.getActiveRestaurants(), req, res);
    }
  } else {
    handlers.request(controller.getAllRestaurants(), req, res);
  }
});

router.get('/:id', validators.hasValidIdParam, function (req, res) {
  handlers.request(controller.getRestaurantById(req.params.id), req, res);
});

router.post('/', auth.hasRole('admin'), function (req, res) {
  console.log(req.body);
  handlers.request(controller.createRestaurant(req.body), req, res);
});

router.post('/:id/rate/:rating', validators.hasValidIdParam, validators.hasValidRatingParam, auth.hasRole('user'), function (req, res) {
  handlers.request(controller.rateRestaurant(req.user.id, req.params.id, req.params.rating), req, res);
});

router.put('/:id', validators.hasValidIdParam, auth.hasRole('admin'), function (req, res) {
  handlers.request(controller.updateRestaurant(req.body), req, res);
});

router.patch('/:id', validators.hasValidIdParam, auth.hasRole('admin'), function (req, res) {
  handlers.request(controller.updateRestaurant(req.body), req, res);
});

router.delete('/:id', validators.hasValidIdParam, auth.hasRole('admin'), function (req, res) {
  handlers.request(controller.deleteRestaurant(req.params.id), req, res);
});

module.exports = router;
