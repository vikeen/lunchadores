'use strict';

var Bluebird = require("bluebird"),
    winston = require("winston"),
    googleMapsAPI = require("../components").googleMapsAPI();

module.exports = {
    getAddress: getAddress,
    byAddress: byAddress
};

/************************/
// Public API
/************************/

/*
 * @param location {String} - Google API lat lng concatenated string. e.g. "35.123132,-94.124112"
 *
 * @return {Promise}
 */
function getAddress(location) {
    winston.debug(location);

    return new Bluebird(function (resolve, reject) {
        googleMapsAPI.reverseGeocode({
            latlng: location
        }, function (error, response) {
            winston.debug("getAddress() googleMapsAPI.reserveGeocode() result:", response);

            if (error) {
                return reject(error);
            }

            return resolve(response);
        });
    });
}

/*
 * Get Geolocation coordinates by a formatted address
 *
 * @param address {String}
 *
 * @return {Promise}
 */
function byAddress(address) {
    winston.debug(address);

    return new Bluebird(function (resolve, reject) {
        googleMapsAPI.geocode({
            address: address
        }, function (error, response) {
            winston.debug("byAddress() googleMapsAPI.geocode() result:", response);

            if (error) {
                return reject(error);
            }

            return resolve(response);
        });
    });
}
