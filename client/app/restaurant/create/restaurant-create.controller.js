(function () {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCreateCtrl', RestaurantCreateCtrl);

  function RestaurantCreateCtrl($timeout, maps, notifications, restaurants, states, countries) {
    var self = this;

    self.activeStep = '';
    self.countries = {};
    self.errors = [];
    self.newRestaurant = {};
    self.states = {};

    self.createRestaurant = createRestaurant;
    self.goToConfirmationStep = goToConfirmationStep;
    self.goToInformationStep = goToInformationStep;
    self.resetFlow = resetFlow;
    self.restaurantInformationStepComplete = restaurantInformationStepComplete;

    activate();

    ////////////

    function activate() {
      self.states = states.getAllStates();
      self.countries = countries.getAllCountries();
      self.resetFlow();
    }

    function createRestaurant() {
      self.newRestaurant.state = self.states[self.newRestaurant.state_abbreviation].name;
      self.newRestaurant.country = self.countries[self.newRestaurant.country_abbreviation].name;

      restaurants.save(self.newRestaurant).$promise
        .then(function () {
          notifications.showSuccess({
            message: 'Successfully added "' + self.newRestaurant.name + '".',
            hide: true
          });
          self.newRestaurant = {};
        })
        .catch(function () {
          notifications.showError({
            message: 'Failed to create restaurant',
            hide: true
          });
        });

      self.resetFlow();
    }

    function goToConfirmationStep() {
      self.activeStep = 'confirmation-step';
    }

    function goToInformationStep() {
      self.activeStep = 'information-step';
    }

    function resetFlow() {
      self.goToInformationStep();
    }

    function restaurantInformationStepComplete() {
      self.verifyingAddress = true;
      self.errors = [];

      var address = [
        self.newRestaurant.street,
        self.newRestaurant.city,
        self.newRestaurant.state_abbreviation + ' ' + self.newRestaurant.zipcode,
        self.newRestaurant.country_abbreviation
      ].join(',');

      maps.getGeoLocation(address)
        .then(function (response) {
          self.goToConfirmationStep();

          self.newRestaurant.formatted_address = response.formatted_address;
          self.newRestaurant.lat = response.lat;
          self.newRestaurant.lng = response.lng;

          // Hacky mechanic to give time for the dom to render
          // before issuing google maps
          $timeout(function () {
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
          }, 250);
        })
        .catch(function (error) {
          self.errors.push(error);
        })
        .finally(function () {
          self.verifyingAddress = false;
        });
    }
  }
})();
