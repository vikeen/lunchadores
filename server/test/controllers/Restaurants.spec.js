"use strict";

var should = require('should'),
    restaurantController = require('./../../app/controllers/Restaurants.js');

describe('Restaurants Controller', function () {
    describe("getRestaurants()", function () {
        it("should fail without location parameter", function (done) {
            restaurantController.getRestaurants({}).catch(function (e) {
                should(e).exist;
                done();
            });

        });
    });
});
