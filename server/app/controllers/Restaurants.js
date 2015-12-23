'use strict';

var Bluebird = require("bluebird"),
    winston = require("winston"),
    googleMapsAPI = require("../components").googleMapsAPI();

module.exports = {
    getRestaurants: getRestaurants
};

/************************/
// Public API
/************************/

/*
 * Get group of restaurants
 */
function getRestaurants(options) {
    options.types = options.types || "restaurant";
    options.rankby = "distance";
    winston.debug(options);

    return new Bluebird(function (resolve, reject) {
        googleMapsAPI.placeSearch(options, function (error, response) {
            winston.debug("placeSearch result:", response);

            if (error) {
                return reject("Unable to query google maps api placeSearch", error);
            }

            return resolve(response);
        });
    });
}
