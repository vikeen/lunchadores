(function () {
  /* jshint camelcase:false */

  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCtrl', RestaurantCtrl);

  function RestaurantCtrl($rootScope, $stateParams, $q, restaurants, notifications) {
    var self = this;

    self.editingName = false;
    self.errors = [];
    self.updateRestaurantFormSubmit = false;
    self.restaurant = {};

    self.canUpdate = canUpdate;
    self.editName = editName;
    self.getGeoCoordinates = getGeoCoordinates;
    self.updateRestaurant = updateRestaurant;

    activate();

    ////////////

    function activate() {
      restaurants.get({id: $stateParams.id}).$promise.then(function (response) {
        self.restaurant = response;
      });
    }

    function canUpdate() {
      return $rootScope.isAdmin();
    }

    function editName() {
      self.editingName = true;
    }

    function getGeoCoordinates() {
      var deferred = $q.defer();

      new google.maps.Geocoder().geocode({address: self.restaurant.address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length === 0) {
            self.errors.push({message: 'No Results Found.'});
            deferred.reject();
          } else if (results.length === 1) {
            self.restaurant.address = results[0].formatted_address;
            self.restaurant.lat = results[0].geometry.location.lat();
            self.restaurant.lng = results[0].geometry.location.lng();

            deferred.resolve();
          } else {
            self.errors.push({message: 'Too many results found. Please refine your search parameters.'});
            deferred.reject();
          }
        } else {
          self.errors.push({message: 'Unknown Error Encountered.'});
          deferred.reject();
        }
      });

      return deferred.promise;
    }

    function updateRestaurant() {
      self.errors = [];
      self.updateRestaurantFormSubmit = true;

      self.getGeoCoordinates().then(function () {
        restaurants.update({id: self.restaurant.id}, self.restaurant).$promise
          .then(function () {
            notifications.showSuccess({
              message: 'Updated "' + self.restaurant.name + '".',
              hide: true
            });
          }).catch(function () {
            notifications.showError({
              message: 'Failed to update: "' + self.restaurant.name + '".',
              hide: true
            });
          })
          .finally(function () {
            self.updateRestaurantFormSubmit = false;
          });
      });
    }
  }
})();
