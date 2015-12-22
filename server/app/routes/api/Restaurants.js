'use strict';

var express = require('express'),
    router = express.Router(),
    controller = require('./../../controllers/Restaurants.js'),
    handlers = require('../../components/helpers').handlers;

router.get('/', function (req, res) {
    var options = {
        types: "restaurant",
        location: req.query.location
    };

    if (req.query.opennow === 'true') {
        options.opennow = true;
    } else if (req.query.opennow === 'false') {
        options.opennow = false;
    }

    handlers.request(controller.getRestaurants(options), req, res);
});

module.exports = router;
