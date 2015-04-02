/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var models = require('../models')();

models.restaurant.find({}).remove(function() {
  models.restaurant.create([
    {
      name: 'Q39 Kansas City BBQ',
      address: '1000 West 39th Street, Kansas City, MO 64111, USA',
      lat: 39.0574043,
      lng: -94.5981116,
      active: true,
      outside_seating: true,
      rating: 1.2
    }, {
      name: 'The Farmhouse',
      address: '300 Delaware Street, Kansas City, MO 64105, USA',
      lat: 39.1093695,
      lng: -94.5848291,
      active: true,
      outside_seating: false,
      rating: 5
    }, {
      name: 'Jersey Boyz',
      address: '315 Armour Road, Kansas City, MO 64116, USA',
      lat: 39.1420553,
      lng: -94.5768657,
      active: true,
      outside_seating: true,
      rating: 0
    }
  ], function(err, items) {
    if (err) {
      console.error(err);
    } else {
      console.log('finished populating restaurants');
    }
  });
});

models.user.find({}).remove(function() {
  models.user.create([
    {
      provider: 'local',
      role: 'user',
      first_name: 'Test',
      last_name: 'User',
      email_address: 'test@test.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      first_name: 'Admin',
      last_name: 'Admin',
      email_address: 'ADMIN@admin.com',
      password: 'admin'
    }, {
      provider: 'local',
      role: 'admin',
      first_name: 'John',
      last_name: 'Rake',
      email_address: 'john.rake12@gmail.com',
      password: 'admin'
    }
  ], function(err, items) {
    if (err) {
      console.error(err);
    } else {
      console.log('finished populating users');
    }
  });
});
