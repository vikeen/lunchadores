'use strict';

var _ = require('lodash'),
    request = require('request'),
    querystring = require("querystring"),
    Promise = require('bluebird'),
    models = require('../models');

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
    var url = "https://maps.googleapis.com/maps/api/place/nearbysearch/json",
        query = {
            types: options.types,
            key: "AIzaSyCkaeP_O1LNuxOXN-7GjdZBld0nWyI8WoM",
            location: options.location,
            rankby: "distance",
            opennow: options.opennow
        };

    url = url + "?" + querystring.stringify(query);
    console.log("google api restaurants query:", url);

    return new Promise(function (resolve, reject) {
        request(url, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                resolve(JSON.parse(body).results);
            } else {
                console.error(error);
                reject(error);
            }
        });
    });
}
