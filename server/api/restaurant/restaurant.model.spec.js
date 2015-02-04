'use strict';

var should = require('should');
var app = require('../../app');
var Restaurant = require('./restaurant.model');

var restaurant = new Restaurant({
  name: 'Fake Restaurant',
  address: 'Fake Address',
  lat: 39.1420553,
  lng: -94.5768657,
  active: true,
  outside_seating: true
});

describe('Restaurant Model', function() {
  before(function(done) {
    Restaurant.remove().exec().then(function() {
      done();
    });
  });

  afterEach(function(done) {
    Restaurant.remove().exec().then(function() {
      done();
    });
  });

  it('should begin with no restaurants', function(done) {
    Restaurant.find({}, function(err, restaurants) {
      restaurants.should.have.length(0);
      done();
    });
  });

  it('should create a restaurant when valid', function() {
    restaurant.save(function (err, restaurant) {
      return should.exist(restaurant);
    });
  });

  // it('should fail when saving a duplicate address', function(done) {
  //   restaurant.save(function() {
  //     var restaurantDup = new Restaurant(restaurant);
  //     restaurantDup.save(function(err) {
  //       should.exist(err);
  //       done();
  //     });
  //   });
  // });

  it('required validation for restaurant name', function() {
    restaurant.name = undefined;
    restaurant.save(function(err) {
      return should.exist(err);
    });
  });

  it('required validation for restaurant address', function() {
    restaurant.address = undefined;
    restaurant.save(function(err) {
      return should.exist(err);
    });
  });

  it('required validation for restaurant lat', function() {
    restaurant.lat = undefined;
    restaurant.save(function(err) {
      return should.exist(err);
    });
  });

  it('required validation for restaurant lng', function() {
    restaurant.lng = undefined;
    restaurant.save(function(err) {
      return should.exist(err);
    });
  });
});
