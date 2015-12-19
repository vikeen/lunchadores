'use strict';

var _ = require('lodash'),
    Promise = require('bluebird'),
    models = require('../models');

module.exports = {
    addTagsToRestaurant: addTagsToRestaurant,
    createRestaurant: createRestaurant,
    deleteRestaurant: deleteRestaurant,
    deleteTagsFromRestaurant: deleteTagsFromRestaurant,
    getActiveRestaurants: getActiveRestaurants,
    getActiveRestaurantsByLocation: getActiveRestaurantsByLocation,
    getAllRestaurants: getAllRestaurants,
    getRestaurantById: getRestaurantById,
    updateRestaurant: updateRestaurant
};

/************************/
// Public API
/************************/

// Get list of active restaurants
function getActiveRestaurants() {
    return models.restaurants.findAll({
        where: {active: true},
        include: [{all: true}]
    });
}

// Get list of active restaurants by location
function getActiveRestaurantsByLocation(location, maxDistance) {
    return models.restaurants.findAll({
        where: {active: true},
        include: [{all: true}]
    }).then(function (restaurants) {
        return _filterRestaurantsByDistance(location, restaurants, maxDistance);
    });
}

// Get list of restaurants
function getAllRestaurants() {
    return models.restaurants.findAll({include: [{all: true}]});
}

function addTagsToRestaurant(id, tags) {
    return Promise.all([
        models.tags.find({where: {id: tags}}),
        models.restaurants.findById(id)
    ]).spread(function (tags, restaurant) {
        return restaurant.addTags(tags);
    });
}

function deleteTagsFromRestaurant(id, tags) {
    return Promise.all([
        models.tags.find({where: {id: tags}}),
        models.restaurants.findById(id)
    ]).spread(function (tags, restaurant) {
        return restaurant.removeTags(tags);
    });
}

// Get a single restaurant
function getRestaurantById(id) {
    return models.restaurants.findById(id, {include: [{all: true}]});
}

// Creates a new restaurant in the DB.
function createRestaurant(payload) {
    return models.restaurants.create(payload).then(function (restaurant) {
        return restaurant.addTags(models.tags.build(payload.tags)).then(function () {
            return restaurant;
        });
    });
}

// Updates an existing restaurant in the DB.
function updateRestaurant(payload) {
    return models.restaurants.findById(payload.id).then(function (restaurant) {
        return restaurant.setTags(models.tags.build(payload.tags)).then(function () {
            return _.merge(restaurant, payload).save();
        });
    });
}

// Deletes a restaurant from the DB.
function deleteRestaurant(restaurantId, callback) {
    return models.restaurants.destroy({where: {id: restaurantId}});
}

/************************/
// Private API
/************************/

/*
 *
 */
function _filterRestaurantsByDistance(startingPoint, restaurants, maxDistance) {
    var result = [];

    restaurants.forEach(function (restaurant) {
        if (_distance(startingPoint.lat, startingPoint.lng, restaurant.lat, restaurant.lng, 'M') <= maxDistance) {
            result.push(restaurant);
        }
    });

    return result;
}

/*
 * Calculate the distance between two coordinate points
 * @param {number}
 * @return {number} distance
 */
function _distance(lat1, lng1, lat2, lng2, unit) {
    var radlat1 = Math.PI * lat1 / 180,
        radlat2 = Math.PI * lat2 / 180,
        theta = lng1 - lng2,
        radtheta = Math.PI * theta / 180,
        dist = ( Math.sin(radlat1) * Math.sin(radlat2) ) +
            ( Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta) );


    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    var miles = dist * 60 * 1.1515;

    switch (unit) {
        case 'K':
            dist = _convertMilestoKM(miles);
            break;
        case 'N':
            dist = _convertMilestoNauticalMiles(miles);
            break;
    }

    return dist;
}

function _convertMilestoKM(miles) {
    return miles * 1.609344;
}

function _convertMilestoNauticalMiles(miles) {
    return miles * 0.8684;
}
