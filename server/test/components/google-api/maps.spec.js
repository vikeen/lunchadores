"use strict";

var googleMapsApi = require("../../../app/components/google-api").maps,
    should = require("should");

describe("Google Maps API", function() {
   it("should get a nearby search result", function(done) {
       return googleMapsApi.nearbySearch({
           types: "restaurant",
           location: "38.9065927,-94.7597751"
       }).then(function(response) {
           should.exist(response);
           done();
       });
   });


    it("should fail if no location is provided", function(done) {
        return googleMapsApi.nearbySearch({
            types: "restaurant"
        }).catch(function(e) {
            should.exist(e);
            done();
        });
    });
});
