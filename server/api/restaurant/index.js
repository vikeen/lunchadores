'use strict';

var express = require('express');
var controller = require('./restaurant.controller');
var validators = require('./restaurant.validators');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', controller.index);
router.get('/:id', validators.hasValidIdParam, controller.show);
router.post('/', auth.hasRole('admin'), controller.create);
router.post('/:id/rate/:rating', validators.hasValidIdParam, validators.hasValidRatingParam, auth.hasRole('user'), controller.rateRestaurant);
router.put('/:id', validators.hasValidIdParam, auth.hasRole('admin'), controller.update);
router.patch('/:id', validators.hasValidIdParam, auth.hasRole('admin'), controller.update);
router.delete('/:id', validators.hasValidIdParam, auth.hasRole('admin'), controller.destroy);

module.exports = router;
