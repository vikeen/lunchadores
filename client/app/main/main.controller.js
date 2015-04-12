(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('MainCtrl', MainCtrl);

  function MainCtrl(restaurants) {
    var self = this;

    restaurants.query().$promise.then(function (response) {
      self.restaurants = response;
    });
  }
})();
