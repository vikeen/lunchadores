"use strict";

var should = require("should");

describe("Google Maps API", function () {

    it("allow for a custom api key parameter", function (done) {

        var googleMapsApi = require("../../../app/components/google-maps-api")({
            key: "dummy-api-key"
        });

        should(googleMapsApi.config.key).be.equal("dummy-api-key");
        done();
    });
});
