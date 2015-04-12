(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCreateCtrl', RestaurantCreateCtrl);

  function RestaurantCreateCtrl($q, restaurants, maps, notifications) {
    var self = this;

    self.newRestaurant = {};
    self.errorMessages = [];
    self.activeStep = 'information-step';

    self.restaurantInformationStepComplete = function() {
      self.verifyingAddress = true;
      self.errorMessages = [];

      var loadingDeferred = $q.defer();

      loadingDeferred.promise.finally(function() {
        self.verifyingAddress = false;
      });

      new google.maps.Geocoder().geocode({ address: self.newRestaurant.address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length === 0) {
            self.errorMessages.push({
              message: 'No Results Found.'
            });
            loadingDeferred.reject();
          } else if (results.length === 1) {
            self.activeStep = 'confirmation-step';

            self.newRestaurant.officialAddress = results[0].formatted_address;
            self.newRestaurant.lat = results[0].geometry.location.lat();
            self.newRestaurant.lng = results[0].geometry.location.lng();

            // Hacky mechanic to give time for the dom to render before issuing google maps
            setTimeout(function() {
              self.map = maps.createMap('map', {
                lat: self.newRestaurant.lat,
                lng: self.newRestaurant.lng
              });

              maps.createMarker({
                lat: self.newRestaurant.lat,
                lng: self.newRestaurant.lng,
                map: self.map,
                title: self.newRestaurant.title
              });

              google.maps.event.trigger(self.map, 'resize');
              loadingDeferred.resolve();
            }, 250);
          } else {
            self.errorMessages.push({
              message: 'Too many results found. Please refine your search parameters.'
            });
            loadingDeferred.reject();
          }
        } else {
          self.errorMessages.push({
            message: 'Unkown Error Encountered.'
          });
          loadingDeferred.reject();
        }
      });
    };

    self.createRestaurant = function() {
      restaurants.save(self.newRestaurant).$promise.then(function(response) {
        notifications.showSuccess({
          message: 'Successfully added "' + self.newRestaurant.name + '".',
          hide: true
        });

        self.newRestaurant = {};
      });

      self.activeStep = 'information-step';
    };
  }
})();
