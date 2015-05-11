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
    street: 'new street',
    city: 'new city',
    state: 'new state',
    state_abbreviation: 'KS',
    country: 'United States of America',
    country_abbreviation: 'USA',
    zipcode: '64105',
    formatted_address: '1000 West 39th Street, Kansas City, MO 64111, USA',
    lat: 39.0574043,
    lng: -94.5981116,
    active: true,
    outside_seating: true,
    rating: 1.2
  },
  {
    id: 2,
    name: 'Nordyk\'s Place',
    street: 'new street',
    city: 'new city',
    state: 'new state',
    state_abbreviation: 'KS',
    country: 'United States of America',
    country_abbreviation: 'USA',
    zipcode: '64105',
    formatted_address: '101 Main Street Kansas City, MO, USA',
    lat: 50.10233,
    lng: -75.2020,
    active: true,
    outside_seating: true,
    rating: 1.2
  },
  {
    id: 3,
    name: 'Pizza Shoppe',
    street: 'new street',
    city: 'new city',
    state: 'new state',
    state_abbreviation: 'KS',
    country: 'United States of America',
    country_abbreviation: 'USA',
    zipcode: '64105',
    formatted_address: '1000 West 39th Street, Kansas City, MO 64111, USA',
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
      require('../../models')(database, function() {
        models = db.models;
        restaurantController = require('./restaurant.controller');
        done();
      });
    });
  });

  beforeEach(function (done) {
    models.restaurant.find({}).remove(function () {
      models.restaurant.create(mockRestaurants, function (err, data) {
        if (err) {
          console.error(err);
          throw err;
        }

        done();
      });
    });
  });

  it('should get all active restaurants', function (done) {
    restaurantController.getActiveRestaurants(function (err, restaurants) {
      should(err).be.null;
      restaurants.should.have.lengthOf(2);
      restaurants[0].should.have.property('name', mockRestaurants[0].name);
      restaurants[0].should.have.property('active', mockRestaurants[0].active);
      done();
    });
  });

  it('should get all restaurants', function (done) {
    restaurantController.getAllRestaurants(function (err, restaurants) {
      should(err).be.null;
      restaurants.should.have.lengthOf(3);
      restaurants[0].should.have.property('name', mockRestaurants[0].name);
      restaurants[0].should.have.property('active', mockRestaurants[0].active);
      restaurants[1].should.have.property('name', mockRestaurants[1].name);
      restaurants[1].should.have.property('active', mockRestaurants[1].active);
      done();
    });
  });

  it('should get all active restaurants in the location distance', function (done) {
    var location = {lat: 39, lng: -94};
    var maxDistance = 25;
    restaurantController.getActiveRestaurantsByLocation(location, maxDistance, function (err, restaurants) {
      should(err).be.null;
      restaurants.should.have.lengthOf(2);
      restaurants[0].should.have.property('name', mockRestaurants[0].name);
      restaurants[0].should.have.property('active', true);
      restaurants[1].should.have.property('name', mockRestaurants[1].name);
      restaurants[1].should.have.property('active', true);
      done();
    });
  });

  it('should get a restaurant by id', function (done) {
    restaurantController.getRestaurantById(mockRestaurants[0].id, function (err, restaurant) {
      should(err).be.null;
      restaurant.should.have.property('name', mockRestaurants[0].name);
      restaurant.should.have.property('active', mockRestaurants[0].active);
      done();
    });
  });

  it('should create a restaurant', function (done) {
    var newRestaurant = {
      name: 'new Restaurant',
      street: 'new street',
      city: 'new city',
      state: 'new state',
      state_abbreviation: 'KS',
      country: 'United States of America',
      country_abbreviation: 'USA',
      zipcode: '64105',
      formatted_address: 'new RestaurantAddress',
      lat: 2.2654,
      lng: 47.39329,
      active: false,
      outside_seating: true,
      rating: 5
    };
    restaurantController.createRestaurant(newRestaurant, function (err, restaurant) {
      should(err).be.null;
      restaurant.should.have.property('name', newRestaurant.name);
      restaurant.should.have.property('active', newRestaurant.active);

      models.restaurant.count(function (err, count) {
        should(err).be.null;
        count.should.equal(mockRestaurants.length + 1);
        done();
      });
    });
  });

  it('should delete a restaurant', function (done) {
    restaurantController.deleteRestaurant(mockRestaurants[0].id, function (err) {
      should(err).be.null;

      models.restaurant.count(function (err, count) {
        should(err).be.null;
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
      should(err).be.null;
      restaurant.should.have.property('name', 'new restaurant name');
      restaurant.should.have.property('address', 'new restaurant address');
      restaurant.should.have.property('active', false);
      done();
    });
  });
});
