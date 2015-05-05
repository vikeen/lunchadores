(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('MainCtrl', MainCtrl);

  function MainCtrl(restaurants) {
    var self = this;

    self.restaurants = undefined;

    activate();

    ////////////

    function activate() {
      getRestaurants();
    }

    function getRestaurants() {
      restaurants.getActive().$promise.then(function (response) {
        self.restaurants = response;
      });
    }
  }
})();
