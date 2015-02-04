/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Restaurant = require('../api/restaurant/restaurant.model');
var User = require('../api/user/user.model');

Restaurant.find({}).remove(function() {
  Restaurant.create({
    name: 'Q39 Kansas City BBQ',
    address: '1000 West 39th Street, Kansas City, MO 64111, USA',
    lat: 39.0574043,
    lng: -94.5981116,
    active: true,
    outside_seating: true
  }, {
    name: 'The Farmhouse',
    address: '300 Delaware Street, Kansas City, MO 64105, USA',
    lat: 39.1093695,
    lng: -94.5848291,
    active: false,
    outside_seating: false
  }, {
    name: 'Jersey Boyz',
    address: '315 Armour Road, Kansas City, MO 64116, USA',
    lat: 39.1420553,
    lng: -94.5768657,
    active: true,
    outside_seating: true
  }, function() {
    console.log('finished populating restaurants');
  });
});

User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'Admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, {
    provider: 'local',
    role: 'admin',
    name: 'John Rake',
    email: 'john.rake12@gmail.com',
    password: 'admin'
  }, function() {
    console.log('finished populating users');
  });
});
