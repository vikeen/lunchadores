(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

  function RestaurantsCtrl(restaurants) {
    var self = this;

    self.sortBy = null;
    self.reverseSort = false;

    self.setColumnSorting = function (newSortBy) {
      self.reverseSort = (newSortBy === self.sortBy) ? !self.reverseSort : false;
      self.sortBy = newSortBy;
    };

    restaurants.query().$promise.then(function (response) {
      self.restaurants = response;
    });
  }
})();
