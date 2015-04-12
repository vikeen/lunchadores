(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCtrl',
    function ($scope, $stateParams, $q, restaurants, notifications) {
      $scope.errorMessages = [];
      $scope.editingName = false;

      $scope.canUpdate = function () {
        return $scope.isAdmin();
      };

      restaurants.get({id: $stateParams.id}).$promise.then(function (response) {
        $scope.restaurant = response;
      });

      $scope.editName = function () {
        $scope.editingName = true;
      };

      $scope.getGeoCoordinates = function () {
        var deferred = $q.defer();

        new google.maps.Geocoder().geocode({address: $scope.restaurant.address}, function (results, status) {
          if (status === google.maps.GeocoderStatus.OK) {
            if (results.length === 0) {
              $scope.errorMessages.push({
                message: 'No Results Found.'
              });
              deferred.reject();
            } else if (results.length === 1) {
              $scope.restaurant.address = results[0].formatted_address;
              $scope.restaurant.lat = results[0].geometry.location.lat();
              $scope.restaurant.lng = results[0].geometry.location.lng();

              deferred.resolve();
            } else {
              $scope.errorMessages.push({
                message: 'Too many results found. Please refine your search parameters.'
              });
              deferred.reject();
            }
          } else {
            $scope.errorMessages.push({
              message: 'Unkown Error Encountered.'
            });
            deferred.reject();
          }
        });

        return deferred.promise;
      };

      $scope.updateRestaurant = function () {
        $scope.getGeoCoordinates().then(function () {
          restaurants.update({id: $scope.restaurant.id}, $scope.restaurant).$promise.then(function (response) {
            $scope.errorMessages = [];
            notifications.showSuccess({
              message: 'Updated "' + $scope.restaurant.name + '".',
              hide: true
            });
          });
        });
      };
    }
  );
})();
