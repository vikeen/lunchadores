'use strict';

angular.module('lunchadoresApp').directive('letsEat',
  function() {
    return {
      restrict: 'EA',
      scope: {
        restaurants: '='
      },
      controllerAs: 'letsEatCtrl',
      templateUrl: 'app/lets-eat/lets-eat.html',
      controller: function($rootScope, $scope, maps) {
        $scope.buttonText = 'Let\'s Eat';

        $scope.selectRandomRestaurant = function() {
          $scope.buttonText = 'Spin Again';

          var newRandomIndex = $scope.getRandomIndex();

          while(newRandomIndex === $scope.selectedRestaurantIndex) {
            newRandomIndex = $scope.getRandomIndex();
          }

          $scope.selectedRestaurantIndex = newRandomIndex;

          $scope.selectedRestaurant = $scope.restaurants[newRandomIndex];
        };

        $scope.getRandomIndex = function() {
          return Math.floor(Math.random() * $scope.restaurants.length);
        };

        $scope.getDirections = function() {
          $scope.map = maps.createMap('map', {
            lat: $rootScope.position.coords.latitude,
            lng: $rootScope.position.coords.longitude
          });

          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap($scope.map);

          var request = {
            origin: new google.maps.LatLng($rootScope.position.coords.latitude, $rootScope.position.coords.longitude),
            destination: $scope.selectedRestaurant.address,
            travelMode: google.maps.TravelMode.DRIVING
          };

          directionsService.route(request, function(result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              $scope.stepsToGetToRestaurant = result.routes[0].legs[0].steps;
              directionsDisplay.setDirections(result);
              $scope.$apply();
            } else {
              // handle error here
            }
          });
        };
      },
      link: function($scope, $element, $attr) {}
    };
  }
);
