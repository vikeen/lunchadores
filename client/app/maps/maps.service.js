(function() {
  'use strict';

  angular.module('lunchadoresApp').factory('maps', MapsService);

  function MapsService($q) {
    return {
      createMap: createMap,
      createMarker: createMarker,
      getGeoLocation: getGeoLocation
    };

    function createMap(elementID, center) {
      return new google.maps.Map(document.getElementById(elementID), {
        center: {
          lat: center.lat,
          lng: center.lng
        },
        zoom: 12,
        maxZoom: 18,
        minZoom: 8,
        keyboardShortcuts: false,
        disableDoubleClickZoom: true
      });
    }

    function createMarker(args) {
      return new google.maps.Marker({
        position: new google.maps.LatLng(args.lat, args.lng),
        map: args.map,
        title: args.title
      });
    }

    function getGeoLocation(address) {
      var deferred = $q.defer();

      new google.maps.Geocoder().geocode({ address: address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length === 0) {
            deferred.reject({ message: 'No Results Found.'});
          } else if (results.length === 1) {
            deferred.resolve({
              address: results[0].formatted_address,
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng()
            });
          } else {
            deferred.reject({ message: 'Too many results found. Please refine your search parameters.'});
          }
        } else {
          deferred.reject({ message: 'Unkown Error Encountered.'});
        }
      });

      return deferred.promise;
    }
  }
})();
