'use strict';

angular.module('lunchadoresApp').directive('letsEat',
  function() {
    return {
      restrict: 'EA',
      scope: {
        restaurants: '='
      },
      templateUrl: 'app/lets-eat/lets-eat.html',
      controllerAs: 'letsEatCtrl',
      controller: function($rootScope, $scope, maps) {
        $scope.resetFlow = function() {
          $scope.buttonText = 'Find Food';
          $scope.restaurantChosen= false;
          $scope.randomRestaurant = undefined;
        };

        $scope.selectRandomRestaurant = function() {
          $scope.buttonText = 'Spin Again';

          var newRandomIndex = $scope.getRandomIndex();

          while(newRandomIndex === $scope.randomRestaurantIndex) {
            newRandomIndex = $scope.getRandomIndex();
          }

          $scope.randomRestaurantIndex = newRandomIndex;

          $scope.randomRestaurant = $scope.restaurants[newRandomIndex];
        };

        $scope.getRandomIndex = function() {
          return Math.floor(Math.random() * $scope.restaurants.length);
        };

        $scope.getDirections = function() {
          $scope.restaurantChosen = true;

          $scope.map = maps.createMap('map', {
            lat: $rootScope.position.coords.latitude,
            lng: $rootScope.position.coords.longitude
          });

          var directionsService = new google.maps.DirectionsService();
          var directionsDisplay = new google.maps.DirectionsRenderer();
          directionsDisplay.setMap($scope.map);

          var request = {
            origin: new google.maps.LatLng($rootScope.position.coords.latitude, $rootScope.position.coords.longitude),
            destination: $scope.randomRestaurant.address,
            travelMode: google.maps.TravelMode.DRIVING
          };

          directionsService.route(request, function(result, status) {
            if (status === google.maps.DirectionsStatus.OK) {
              $scope.timeToRestaurant = result.routes[0].legs[0].duration.text;
              $scope.distanceToRestaurant = result.routes[0].legs[0].distance.text;
              $scope.stepsToGetToRestaurant = result.routes[0].legs[0].steps;

              directionsDisplay.setDirections(result);
              $scope.$apply();
            } else {
              // handle error here
            }
          });
        };

        $scope.resetFlow();
      },
      link: function($scope, $element, $attr) {}
    };
  }
);
