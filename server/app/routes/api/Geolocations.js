'use strict';

var express = require('express'),
    controller = require('./../../controllers/Geolocations.js'),
    handlers = require('../../components/helpers').handlers;

var router = express.Router();

// TODO - middleware validation for location query param
router.get('/address', function (req, res) {
    handlers.request(controller.getAddress(req.query.location), req, res);
});


// TODO middleware validation for address query param
router.get('/byAddress', function (req, res) {
    handlers.request(controller.byAddress(req.query.address), req, res);
});

module.exports = router;
