'use strict';

var should = require('should'),
  _ = require('lodash'),
  db,
  models;

var mockRestaurants = [
  {
    id: 1,
    name: 'Q39 Kansas City BBQ',
    address: '1000 West 39th Street, Kansas City, MO 64111, USA',
    lat: 39.0574043,
    lng: -94.5981116,
    active: true,
    outside_seating: true,
    rating: 1.2
  },
  {
    id: 2,
    name: 'Pizza Shoppe',
    address: '1000 West 39th Street, Kansas City, MO 64111, USA',
    lat: 2.2654,
    lng: 47.39329,
    active: false,
    outside_seating: true,
    rating: 4.8
  }
];

describe('Restaurant Model', function () {
  before(function (done) {
    require('../../database').connect(function (database) {
      db = database;
      models = require('../../models')(database);
      done();
    });
  });

  beforeEach(function (done) {
    models.restaurant.find({}).remove(function () {
      models.restaurant.create(mockRestaurants, function () {
        done();
      });
    });
  });

  it('should default to active on create', function (done) {
    var newRestaurant = _.clone(mockRestaurants[0]);
    newRestaurant.id = mockRestaurants.length + 1;
    delete newRestaurant.active;
    models.restaurant.create(newRestaurant, function(err, restaurant) {
      restaurant.should.have.property('name', newRestaurant.name);
      restaurant.should.have.property('active', true);
      done();
    });
  });

  it('should default to 0 rating on create', function (done) {
    var newRestaurant = _.clone(mockRestaurants[0]);
    newRestaurant.id = mockRestaurants.length + 1;
    delete newRestaurant.rating;
    models.restaurant.create(newRestaurant, function(err, restaurant) {
      restaurant.should.have.property('name', newRestaurant.name);
      restaurant.should.have.property('rating', 0);
      done();
    });
  });
});
