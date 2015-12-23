"use strict";

var config = require("../../../config/environment")(),
    Promise = require("bluebird"),
    request = require("request"),
    winston = require("winston"),
    querystring = require("querystring");

module.exports = {
    nearbySearch: nearbySearch
};

/*
 *
 * @param options {Object}
 *
 * @return {Promise}
 */
function nearbySearch(options) {
    winston.debug(options);

    if (!options.location) {
        winston.error("missing required location parameter");
        return Promise.reject("missing required location parameter");
    }

    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        query = {
            types: options.types,
            key: config.google.apiKey,
            location: options.location,
            rankby: "distance",
            opennow: options.opennow
        };

    url = url + "?" + querystring.stringify(query);

    winston.debug(url);

    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(JSON.parse(body).results);
            } else {
                winston.error(error);
                reject(error);
            }
        });
    });
}
