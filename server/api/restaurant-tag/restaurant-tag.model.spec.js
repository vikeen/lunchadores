'use strict';

var should = require('should'),
  _ = require('lodash'),
  Promise = require('bluebird'),
  models = require('../../models');

var mockTag = {
    id: 1,
    name: 'vegan',
    readable_name: 'Vegan'
  },
  mockRestaurant = {
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
  };

describe('Restaurant Tag Model', function () {
  before(function (done) {
    done();
  });

  beforeEach(function (done) {
    Promise.all([
      models.tag.destroy({where: {}}),
      models.restaurant.destroy({where: {}})
    ]).then(function () {
      Promise.all([
        models.tag.create(mockTag),
        models.restaurant.create(mockRestaurant)
      ]).spread(function (tag, restaurant) {
        restaurant.addTag(tag).then(function() {
          done();
        }).catch(console.error);
      }).catch(console.error);
    }).catch(console.error);
  });

  it('should be a functional model', function (done) {
    models.restaurant.findById(mockRestaurant.id).then(function (restaurant) {
      restaurant.hasTag(models.tag.build(mockTag)).then(function(tag) {
        should(tag).be.true;
        models.restaurant_tag.findAll().then(function(restaurantTags) {
          restaurantTags.should.have.lengthOf(1);
          restaurantTags[0].should.have.property('tag_id', mockTag.id);
          restaurantTags[0].should.have.property('restaurant_id', mockRestaurant.id);
          done();
        });
      }).catch(console.error);
    }).catch(console.error);
  });
});
