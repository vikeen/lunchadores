'use strict';

var googleApi = require("../components").googleApi;

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
    return googleApi.maps.nearbySearch(options);
}
