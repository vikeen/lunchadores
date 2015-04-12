(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCtrl', RestaurantCtrl);

  function RestaurantCtrl($rootScope, $stateParams, $q, restaurants, notifications) {
    var self = this;

    self.errorMessages = [];
    self.editingName = false;

    self.canUpdate = function () {
      return $rootScope.isAdmin();
    };

    restaurants.get({id: $stateParams.id}).$promise.then(function (response) {
      self.restaurant = response;
    });

    self.editName = function () {
      self.editingName = true;
    };

    self.getGeoCoordinates = function () {
      var deferred = $q.defer();

      new google.maps.Geocoder().geocode({address: self.restaurant.address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length === 0) {
            self.errorMessages.push({
              message: 'No Results Found.'
            });
            deferred.reject();
          } else if (results.length === 1) {
            self.restaurant.address = results[0].formatted_address;
            self.restaurant.lat = results[0].geometry.location.lat();
            self.restaurant.lng = results[0].geometry.location.lng();

            deferred.resolve();
          } else {
            self.errorMessages.push({
              message: 'Too many results found. Please refine your search parameters.'
            });
            deferred.reject();
          }
        } else {
          self.errorMessages.push({
            message: 'Unkown Error Encountered.'
          });
          deferred.reject();
        }
      });

      return deferred.promise;
    };

    self.updateRestaurant = function () {
      self.getGeoCoordinates().then(function () {
        restaurants.update({id: self.restaurant.id}, self.restaurant).$promise.then(function (response) {
          self.errorMessages = [];
          notifications.showSuccess({
            message: 'Updated "' + self.restaurant.name + '".',
            hide: true
          });
        });
      });
    };
  }
})();
