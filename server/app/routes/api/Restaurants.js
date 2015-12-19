'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./../../controllers/Restaurants.js'),
    validators = require('./../../validators/Restaurants.js'),
    auth = require('../auth/auth.service'),
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

router.post('/',
    validators.hasValidTagsPayload,
    function (req, res) {
        handlers.request(controller.createRestaurant(req.body), req, res);
    });

router.put('/:id',
    validators.hasValidIdParam,
    validators.hasValidTagsPayload,
    function (req, res) {
        handlers.request(controller.updateRestaurant(req.body), req, res);
    });

/*
 * To help currate more restaurant data only restrict
 * deletion of data to admin
 */
router.delete('/:id',
    validators.hasValidIdParam,
    auth.hasRole('admin'),
    function (req, res) {
        handlers.request(controller.deleteRestaurant(req.params.id), req, res);
    });

module.exports = router;
