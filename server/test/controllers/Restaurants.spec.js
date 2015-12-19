"use strict";

var should = require('should'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    models = require('../../app/models'),
    restaurantController = require('./../../app/controllers/Restaurants.js');

var mockTags = [{
    id: 1,
    name: 'vegan',
    readable_name: 'Vegan'
}];
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

describe('Restaurants Controller', function () {
    before(function (done) {
        done();
    });

    beforeEach(function (done) {
        return Promise.all([
            models.restaurants.destroy({where: {}}).then(function () {
                return models.restaurants.bulkCreate(mockRestaurants, {individualHooks: true});
            }),
            models.tags.destroy({where: {}}).then(function () {
                return models.tags.bulkCreate(mockTags, {individualHooks: true});
            }),
            models.restaurants_tags.destroy({where: {}})
        ]).then(function () {
            done();
        }).catch(console.error);
    });

    it('should get all active restaurants', function (done) {
        restaurantController.getActiveRestaurants().then(function (restaurants) {
            restaurants.should.have.lengthOf(2);
            done();
        }).catch(console.error);
    });

    it('should get all restaurants', function (done) {
        restaurantController.getAllRestaurants().then(function (restaurants) {
            restaurants.should.have.lengthOf(3);
            done();
        }).catch(console.error);
    });

    it('should get all active restaurants in the location distance', function (done) {
        var location = {lat: 39, lng: -94};
        var maxDistance = 25;
        restaurantController.getActiveRestaurantsByLocation(location, maxDistance).then(function (restaurants) {
            restaurants.should.have.lengthOf(2);
            done();
        }).catch(console.error);
    });

    it('should get a restaurant by id', function (done) {
        restaurantController.getRestaurantById(mockRestaurants[0].id).then(function (restaurant) {
            restaurant.should.have.property('name', mockRestaurants[0].name);
            restaurant.should.have.property('active', mockRestaurants[0].active);
            done();
        }).catch(console.error);
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

            models.restaurants.count().then(function (count) {
                count.should.equal(mockRestaurants.length + 1);
                done();
            }).catch(console.error);
        }).catch(console.error);
    });

    it('should delete a restaurant', function (done) {
        restaurantController.deleteRestaurant(mockRestaurants[0].id).then(function () {
            models.restaurants.count().then(function (count) {
                count.should.equal(mockRestaurants.length - 1);
                done();
            }).catch(console.error);
        }).catch(console.error);
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
        }).catch(console.error);
    });

    describe('Tags', function () {
        it('should add a tag', function (done) {
            var id = mockRestaurants[0].id,
                tagIds = [mockTags[0].id];

            restaurantController.addTagsToRestaurant(id, tagIds).then(function () {
                models.restaurants_tags.findAll().then(function (restaurantTags) {
                    restaurantTags.should.have.lengthOf(1);
                    restaurantTags[0].should.have.property('tag_id', tagIds[0]);
                    restaurantTags[0].should.have.property('restaurant_id', id);
                    done();
                });
            });
        });

        it('should ignore tags do not exist on add', function (done) {
            var id = mockRestaurants[0].id,
                tagIds = [mockTags[0].id, 2, 3, 4];

            restaurantController.addTagsToRestaurant(id, tagIds).then(function () {
                models.restaurants_tags.findAll().then(function (restaurantTags) {
                    restaurantTags.should.have.lengthOf(1);
                    restaurantTags[0].should.have.property('tag_id', tagIds[0]);
                    restaurantTags[0].should.have.property('restaurant_id', id);
                    done();
                });
            });
        });

        it('should delete a tag', function (done) {
            var id = mockRestaurants[0].id,
                tagIds = [mockTags[0].id];

            restaurantController.addTagsToRestaurant(id, tagIds).then(function () {
                restaurantController.deleteTagsFromRestaurant(id, tagIds).then(function () {
                    models.restaurants_tags.findAll().then(function (restaurantTags) {
                        restaurantTags.should.have.lengthOf(0);
                        done();
                    });
                });
            });
        });

        it('should ignore tags do not exist on delete', function (done) {
            var id = mockRestaurants[0].id,
                tagIds = [mockTags[0].id, 2, 3, 4];

            restaurantController.addTagsToRestaurant(id, tagIds).then(function () {
                restaurantController.deleteTagsFromRestaurant(id, [mockTags[0].id]).then(function () {
                    models.restaurants_tags.findAll().then(function (restaurantTags) {
                        restaurantTags.should.have.lengthOf(0);
                        done();
                    });
                });
            });
        });
    });
});
