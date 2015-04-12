(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('LetsEatCtrl', LetsEatCtrl);

  function LetsEatCtrl($rootScope, maps) {
    var self = this;

    self.buttonText = 'Find Food';
    self.distanceToRestaurant = undefined;
    self.randomRestaurant = undefined;
    self.restaurantChosen = false;
    self.stepsToGetToRestaurant = undefined;
    self.timeToRestaurant = undefined;

    self.getDirections = getDirections;
    self.getRandomIndex = getRandomIndex;
    self.resetFlow = resetFlow;
    self.selectRandomRestaurant = selectRandomRestaurant;

    self.resetFlow();

    ////////////

    function getDirections() {
      self.restaurantChosen = true;

      var request = {
        origin: new google.maps.LatLng($rootScope.position.coords.latitude, $rootScope.position.coords.longitude),
        destination: self.randomRestaurant.address,
        travelMode: google.maps.TravelMode.DRIVING
      };

      setTimeout(function() {
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

    function getRandomIndex() {
      return Math.floor(Math.random() * self.restaurants.length);
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

      var newRandomIndex = self.getRandomIndex();

      while (newRandomIndex === self.randomRestaurantIndex) {
        newRandomIndex = self.getRandomIndex();
      }

      self.randomRestaurantIndex = newRandomIndex;
      self.randomRestaurant = self.restaurants[newRandomIndex];
    }
  }
})();
