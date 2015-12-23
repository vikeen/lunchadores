"use strict";

var _ = require("lodash"),
    config = require("../../../config/environment")(),
    GoogleMapsAPI = require("googlemaps");

module.exports = function (options) {
    var googleMapsAPIConfig = _.extend({
        key: config.google.apiKey,
        secure: true // use https
    }, options);

    return new GoogleMapsAPI(googleMapsAPIConfig);
};
