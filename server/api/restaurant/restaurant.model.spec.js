'use strict';

var should = require('should'),
  _ = require('lodash'),
  models = require('../../models');

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
    formatted_address: '1000 West 39th Street, Kansas City, MO 64112, USA',
    lat: 39.0574043,
    lng: -94.5981116,
    active: true,
    rating: 1.2
  },
  {
    id: 2,
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
    rating: 4.8
  }
];

describe('Restaurant Model', function () {
  before(function (done) {
    done();
  });

  beforeEach(function (done) {
    models.restaurant.destroy({ where: {}}).then(function () {
      models.restaurant.bulkCreate(mockRestaurants, {individualHooks: true}).then(function () {
        done();
      }).catch(function(err) {
        console.log(err);
      });
    });
  });

  it('should default to active on create', function (done) {
    var newRestaurant = _.clone(mockRestaurants[0]);
    newRestaurant.id = mockRestaurants.length + 1;
    newRestaurant.formatted_address = 'new address';
    delete newRestaurant.active;
    models.restaurant.create(newRestaurant).then(function (restaurant) {
      restaurant.should.have.property('name', newRestaurant.name);
      restaurant.should.have.property('active', true);
      done();
    }).catch(function(err) {
      console.log(err);
    });
  });
});
