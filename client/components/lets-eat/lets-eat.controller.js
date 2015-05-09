(function () {
  'use strict';

  angular.module('lunchadoresApp').controller('LetsEatCtrl', LetsEatCtrl);

  function LetsEatCtrl($scope, $rootScope, $timeout, restaurants, maps) {
    var self = this;

    self.buttonText = 'Find Food';
    self.distanceToRestaurant = null;
    self.distance = 25; // Miles
    self.maxDistance = 50; // Miles
    self.randomRestaurant = null;
    self.restaurants = null;
    self.restaurantChosen = false;
    self.restaurantsLoading = null;
    self.stepsToGetToRestaurant = null;
    self.timeToRestaurant = null;

    self.getDirections = getDirections;
    self.resetFlow = resetFlow;
    self.selectRandomRestaurant = selectRandomRestaurant;

    activate();

    function activate() {
      self.resetFlow();
      _getRestaurants();
    }

    /*
     * Public API
     */

    function getDirections() {
      self.restaurantChosen = true;

      var request = {
        origin: new google.maps.LatLng($rootScope.position.coords.latitude, $rootScope.position.coords.longitude),
        destination: self.randomRestaurant.address,
        travelMode: google.maps.TravelMode.DRIVING
      };

      $timeout(function () {
        self.map = maps.createMap('map', {
          lat: $rootScope.position.coords.latitude,
          lng: $rootScope.position.coords.longitude
        });

        maps.getDirections(self.map, request)
          .then(function (response) {
            self.timeToRestaurant = response.routes[0].legs[0].duration.text;
            self.distanceToRestaurant = response.routes[0].legs[0].distance.text;
            self.stepsToGetToRestaurant = response.routes[0].legs[0].steps;
          })
          .catch(function (error) {
            console.error(error);
          });

        google.maps.event.trigger(self.map, 'resize');
      }, 250);
    }

    function resetFlow(selectRestaurant) {
      self.buttonText = 'Find Food';
      self.restaurantChosen = false;
      self.randomRestaurant = undefined;

      if (selectRestaurant) {
        self.selectRandomRestaurant();
      }
    }

    function selectRandomRestaurant() {
      self.buttonText = 'Spin Again';

      var newRandomIndex = _getRandomIndex(self.restaurants.length);

      while (newRandomIndex === self.randomRestaurantIndex) {
        newRandomIndex = _getRandomIndex(self.restaurants.length);
      }

      self.randomRestaurantIndex = newRandomIndex;
      self.randomRestaurant = self.restaurants[newRandomIndex];
    }

    /*
     * Private API
     */

    function _getRandomIndex(max) {
      return Math.floor(Math.random() * max);
    }

    function _getRestaurants() {
      self.restaurantsLoading = true;
      $rootScope.geolocationPromise
        .then(function (position) {
          restaurants.getActive({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            distance: self.maxDistance
          }).$promise.then(function (response) {
              self.restaurantsLoading = false;
              self.restaurants = response;
            });
        });
    }
  }
})();
