"use strict";

var should = require('should'),
  _ = require('lodash'),
  models = require('../../models'),
  restaurantController = require('./restaurant.controller');

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
    formatted_address: '1000 West 39th Street, Kansas City, MO 64112, USA',
    lat: 2.2654,
    lng: 47.39329,
    active: false,
    outside_seating: true,
    rating: 4.8
  }
];

describe('Restaurant Controller', function () {
  before(function (done) {
    done();
  });

  beforeEach(function (done) {
    models.restaurant.findAll().then(function () {
      models.restaurant.destroy({where: {}}).then(function () {
        models.restaurant.bulkCreate(mockRestaurants, {individualHooks: true})
          .then(function () {
            done();
          }).catch(function (err) {
            console.error(err);
            throw(err);
          });
      });
    });
  });

  it('should get all active restaurants', function (done) {
    restaurantController.getActiveRestaurants().then(function (restaurants) {
      restaurants.should.have.lengthOf(2);
      done();
    });
  });

  it('should get all restaurants', function (done) {
    restaurantController.getAllRestaurants().then(function (restaurants) {
      restaurants.should.have.lengthOf(3);
      done();
    });
  });

  it('should get all active restaurants in the location distance', function (done) {
    var location = {lat: 39, lng: -94};
    var maxDistance = 25;
    restaurantController.getActiveRestaurantsByLocation(location, maxDistance).then(function (restaurants) {
      restaurants.should.have.lengthOf(2);
      done();
    });
  });

  it('should get a restaurant by id', function (done) {
    restaurantController.getRestaurantById(mockRestaurants[0].id).then(function (restaurant) {
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
      rating: 5
    };
    restaurantController.createRestaurant(newRestaurant).then(function (restaurant) {
      restaurant.should.have.property('name', newRestaurant.name);
      restaurant.should.have.property('active', newRestaurant.active);

      models.restaurant.count().then(function (count) {
        count.should.equal(mockRestaurants.length + 1);
        done();
      })
    }).catch(function (err) {
      console.log(err);
    });
  });

  it('should delete a restaurant', function (done) {
    restaurantController.deleteRestaurant(mockRestaurants[0].id).then(function () {
      models.restaurant.count().then(function (count) {
        count.should.equal(mockRestaurants.length - 1);
        done();
      }).catch(function (err) {
        console.log(err);
      })
    });
  });

  it('should update a restaurant', function (done) {
    var updatePayload = {
      id: mockRestaurants[0].id,
      name: 'new restaurant name',
      address: 'new restaurant address',
      active: false
    };

    restaurantController.updateRestaurant(updatePayload).then(function (restaurant) {
      restaurant.should.have.property('name', 'new restaurant name');
      restaurant.should.have.property('address', 'new restaurant address');
      restaurant.should.have.property('active', false);
      done();
    });
  });
});
