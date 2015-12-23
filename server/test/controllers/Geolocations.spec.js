"use strict";

var should = require('should'),
    geolocationController = require('./../../app/controllers/Geolocations.js');

describe('Geolocations Controller', function () {
    describe('byAddress()', function (done) {
        it("should fail without the address parameter", function (done) {
            geolocationController.byAddress().catch(function (e) {
                done();
            });
        });
    });

    describe('getAddress()', function (done) {
        it("should fail without the location parameter", function (done) {
            geolocationController.getAddress().catch(function (e) {
                done();
            });
        });
    });
});
