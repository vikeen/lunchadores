(function() {
  'use strict';

  angular.module('lunchadoresApp').factory('maps', MapsService);

  function MapsService() {
    return {
      createMap: function (elementID, center) {
        return new google.maps.Map(document.getElementById(elementID), {
          center: {
            lat: center.lat,
            lng: center.lng
          },
          zoom: 12,
          maxZoom: 18,
          minZoom: 8,
          keyboardShortcuts: false,
          disableDoubleClickZoom: true,
        });
      },
      createMarker: function (args) {
        return new google.maps.Marker({
          position: new google.maps.LatLng(args.lat, args.lng),
          map: args.map,
          title: args.title
        });
      }
    };
  }
})();
