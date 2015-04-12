(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCreateCtrl', RestaurantCreateCtrl);

  function RestaurantCreateCtrl(restaurants, maps, notifications) {
    var self = this;

    self.activeStep = 'information-step';
    self.createRestaurant = createRestaurant;
    self.errorMessages = [];
    self.goToConfirmationStep = goToConfirmationStep;
    self.goToInformationStep = goToInformationStep;
    self.newRestaurant = {};
    self.restaurantInformationStepComplete = restaurantInformationStepComplete;

    ////////////

    function createRestaurant() {
      restaurants.save(self.newRestaurant).$promise.then(function() {
        notifications.showSuccess({
          message: 'Successfully added "' + self.newRestaurant.name + '".',
          hide: true
        });

        self.newRestaurant = {};
      });

      self.goToInformationStep();
    }

    function goToConfirmationStep() {
      self.activeStep = 'confirmation-step';
    }

    function goToInformationStep() {
      self.activeStep = 'information-step';
    }

    function restaurantInformationStepComplete() {
      self.verifyingAddress = true;
      self.errorMessages = [];

      maps.getGeoLocation(self.newRestaurant.address)
        .then(function(response) {
          self.goToConfirmationStep();

          self.newRestaurant.officialAddress = response.address;
          self.newRestaurant.lat = response.lat;
          self.newRestaurant.lng = response.lng;

          // Hacky mechanic to give time for the dom to render
          // before issuing google maps
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
          }, 250);
        })
        .catch(function(error) {
          self.errorMessages.push(error);
        })
        .finally(function() {
          self.verifyingAddress = false;
        });
    }
  }
})();
