/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var _ = require('lodash'),
  async = require('async'),
  models = require('../models')();

module.exports = seedDatabase;

function seedDatabase(callback) {
  return async.series([
    seedRestaurants,
    seedUsers,
    seedPasswordResets
  ], function () {
    console.log('finished seeding database');
    if (_.isFunction(callback)) {
      callback();
    }
  });
}

function seedRestaurants(callback) {
  models.restaurant.find({}).remove(function () {
    models.restaurant.create([
      {
        id: 1,
        name: 'Q39 Kansas City BBQ',
        street: '1000 West 39th Street',
        city: 'Kansas City',
        state: 'Missouri',
        state_abbreviation: 'MO',
        country: 'United States',
        country_abbreviation: 'USA',
        zipcode: '64111',
        formatted_address: '1000 West 39th Street, Kansas City, MO 64111, USA',
        lat: 39.0574043,
        lng: -94.5981116,
        active: true,
        outside_seating: true,
        rating: 1.2
      }, {
        id: 2,
        name: 'The Farmhouse',
        street: '300 Delaware Street',
        city: 'Kansas City',
        state: 'Missouri',
        state_abbreviation: 'MO',
        country: 'United States',
        country_abbreviation: 'USA',
        zipcode: '64105',
        formatted_address: '300 Delaware Street, Kansas City, MO 64105, USA',
        lat: 39.1093695,
        lng: -94.5848291,
        active: true,
        outside_seating: false,
        rating: 5
      }, {
        id: 3,
        name: 'Jersey Boyz',
        street: '315 Armour Road',
        city: 'Kansas City',
        state: 'Missouri',
        state_abbreviation: 'MO',
        country: 'United States',
        country_abbreviation: 'USA',
        zipcode: '64116',
        formatted_address: '315 Armour Road, Kansas City, MO 64116, USA',
        lat: 39.1420553,
        lng: -94.5768657,
        active: true,
        outside_seating: true,
        rating: 0
      }, {
        id: 4,
        name: 'Cafe Gratitude',
        street: '333 Southwest Blvd',
        city: 'Kansas City',
        state: 'Missouri',
        state_abbreviation: 'MO',
        country: 'United States',
        country_abbreviation: 'USA',
        zipcode: '64108',
        formatted_address: '333 Southwest Blvd, Kansas City, MO 64108, USA',
        lat: 34,
        lng: -95,
        active: true,
        outside_seating: false,
        vegan: true,
        vegetarian: true
      },
      {
        id: 5,
        name: 'Shnazzy Pizza',
        street: '300 Delaware Street',
        city: 'Kansas City',
        state: 'Missouri',
        state_abbreviation: 'MO',
        country: 'United States',
        country_abbreviation: 'USA',
        zipcode: '64105',
        formatted_address: '300 Delaware Street, Kansas City, MO 64105, USA',
        lat: 10.1093695,
        lng: -94.5848291,
        active: true,
        outside_seating: false,
        rating: 5
      }
    ], function (err, items) {
      if (err) {
        console.error(err);
      } else {
        console.log('finished populating restaurants');
        callback();
      }
    });
  });
}

function seedUsers(callback) {
  models.user.find({}).remove(function () {
    models.user.create([
      {
        id: 1,
        provider: 'local',
        active: true,
        role: 'user',
        first_name: 'Test',
        last_name: 'User',
        email_address: 'test@test.com',
        password: 'test'
      }, {
        id: 2,
        provider: 'local',
        active: true,
        role: 'admin',
        first_name: 'Admin',
        last_name: 'Admin',
        email_address: 'admin@admin.com',
        password: 'admin'
      }, {
        id: 3,
        provider: 'local',
        active: true,
        role: 'admin',
        first_name: 'John',
        last_name: 'Rake',
        email_address: 'john.rake12@gmail.com',
        password: 'admin'
      }
    ], function (err, items) {
      if (err) {
        console.error(err);
      } else {
        console.log('finished populating users');
        callback();
      }
    });
  });
}

function seedPasswordResets(callback) {
  models.password_reset.find({}).remove(function () {
    models.password_reset.create([
      {
        user_id: 1,
        verification_id: '11d97080-7796-49e1-a76a-4b73383c299b'
      },
      {
        user_id: 2,
        verification_id: '21d97080-7796-49e1-a76a-4b73383c299b'
      },
      {
        user_id: 3,
        verification_id: '31d97080-7796-49e1-a76a-4b73383c299b'
      }
    ], function (err, passwordResets) {
      if (err) {
        console.error(err);
      } else {
        console.log('finished populating password resets');
        callback();
      }
    });
  });
}
