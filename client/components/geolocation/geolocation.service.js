(function () {
    'use strict';

    angular.module('lunchadoresApp').service('geolocationService', GeolocationService);

    GeolocationService.$inject = ["$resource"];
    function GeolocationService($resource) {
        var baseUrl = "api/geolocations";

        return $resource(baseUrl, {}, {
            getAddress: {
                method: "GET",
                url: baseUrl + '/address'
            },

            byAddress: {
                method: "GET",
                url: baseUrl + '/byAddress'
            }
        });
    }
})();
