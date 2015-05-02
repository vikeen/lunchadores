"use strict";

var should = require('should'),
  _ = require('lodash'),
  db,
  models,
  restaurantController;

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

describe('Restaurant Controller', function () {
  before(function (done) {
    require('../../database').connect(function (database) {
      db = database;
      models = require('../../models')(database);
      restaurantController = require('./restaurant.controller');
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

  it('should get all active restaurants', function (done) {
    restaurantController.getActiveRestaurants(function (err, restaurants) {
      restaurants.should.have.lengthOf(1);
      restaurants[0].should.have.property('name', mockRestaurants[0].name);
      restaurants[0].should.have.property('active', mockRestaurants[0].active);
      done();
    });
  });

  it('should get all restaurants', function (done) {
    restaurantController.getAllRestaurants(function (err, restaurants) {
      restaurants.should.have.lengthOf(2);
      restaurants[0].should.have.property('name', mockRestaurants[0].name);
      restaurants[0].should.have.property('active', mockRestaurants[0].active);
      restaurants[1].should.have.property('name', mockRestaurants[1].name);
      restaurants[1].should.have.property('active', mockRestaurants[1].active);
      done();
    });
  });

  it('should get a restaurant by id', function (done) {
    restaurantController.getRestaurantById(mockRestaurants[0].id, function (err, restaurant) {
      restaurant.should.have.property('name', mockRestaurants[0].name);
      restaurant.should.have.property('active', mockRestaurants[0].active);
      done();
    });
  });

  it('should create a restaurant', function (done) {
    var newRestaurant = {
      name: 'new Restaurant',
      address: 'new RestaurantAddress',
      lat: 2.2654,
      lng: 47.39329,
      active: false,
      outside_seating: true,
      rating: 5
    };
    restaurantController.createRestaurant(newRestaurant, function (err, restaurant) {
      restaurant.should.have.property('name', newRestaurant.name);
      restaurant.should.have.property('active', newRestaurant.active);

      models.restaurant.count(function (err, count) {
        count.should.equal(mockRestaurants.length + 1);
        done();
      });
    });
  });

  it('should delete a restaurant', function (done) {
    restaurantController.deleteRestaurant(mockRestaurants[0].id, function (err) {
      models.restaurant.count(function (err, count) {
        count.should.equal(mockRestaurants.length - 1);
        done();
      });
    });
  });

  it('should update a restaurant', function (done) {
    var updatePayload = {
      id: mockRestaurants[0].id,
      name: 'new restaurant name',
      address: 'new restaurant address',
      active: false
    };

    restaurantController.updateRestaurant(updatePayload, function (err, restaurant) {
      restaurant.should.have.property('name', 'new restaurant name');
      restaurant.should.have.property('address', 'new restaurant address');
      restaurant.should.have.property('active', false);
      done();
    });
  });

});
