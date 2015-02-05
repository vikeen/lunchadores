/* jshint camelcase: false */

'use strict';

angular.module('lunchadoresApp').controller('RestaurantsCtrl',
  function ($scope, $q, restaurants, maps, notifications) {
    $scope.newRestaurant = {};
    $scope.errorMessages = [];
    $scope.activeStep = 'information-step';

    restaurants.query().$promise.then(function(response) {
      $scope.restaurants = response;
    });

    $scope.restaurantInformationStepComplete = function() {
      $scope.verifyingAddress = true;
      $scope.errorMessages = [];

      var loadingDeferred = $q.defer();

      loadingDeferred.promise.finally(function() {
        $scope.verifyingAddress = false;
      });

      new google.maps.Geocoder().geocode({ address: $scope.newRestaurant.address }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length === 0) {
            $scope.errorMessages.push({
              message: 'No Results Found.'
            });
            loadingDeferred.reject();
          } else if (results.length === 1) {
            $scope.activeStep = 'confirmation-step';

            $scope.newRestaurant.officialAddress = results[0].formatted_address;
            $scope.newRestaurant.lat = results[0].geometry.location.lat();
            $scope.newRestaurant.lng = results[0].geometry.location.lng();

            // Hacky mechanic to give time for the dom to render before issuing google maps
            setTimeout(function() {
              $scope.map = maps.createMap('map', {
                lat: $scope.newRestaurant.lat,
                lng: $scope.newRestaurant.lng
              });

              maps.createMarker({
                lat: $scope.newRestaurant.lat,
                lng: $scope.newRestaurant.lng,
                map: $scope.map,
                title: $scope.newRestaurant.title
              });

              google.maps.event.trigger($scope.map, 'resize');
              loadingDeferred.resolve();
            }, 250);
          } else {
            $scope.errorMessages.push({
              message: 'Too many results found. Please refine your search parameters.'
            });
            loadingDeferred.reject();
          }
        } else {
          $scope.errorMessages.push({
            message: 'Unkown Error Encountered.'
          });
          loadingDeferred.reject();
        }
      });
    };

    $scope.createRestaurant = function() {
      restaurants.save($scope.newRestaurant).$promise.then(function(response) {
        $scope.restaurants.push(response.toJSON());

        notifications.showSuccess({
          message: 'Successfully added "' + $scope.newRestaurant.name + '".',
          hide: true
        });

        $scope.newRestaurant = {};
      });

      $scope.activeStep = 'information-step';
    };

    // TODO: evaluate this for performance. It's likely much more performant to loop through until we find the one then splice that index out
    $scope.deleteRestaurant = function(id) {
      if (window.confirm('Delete Restaurant?')) {
        restaurants.delete({'id': id}).$promise.then(function() {
          _.every($scope.restaurants, function(restaurant, index) {

            if (restaurant._id === id) {
              $scope.restaurants.splice(index, 1);
              return false;
            }

            return true;
          });
        });
      }
    };
  }
);
