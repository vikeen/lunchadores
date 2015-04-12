(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

  function RestaurantsCtrl(restaurants) {
    var self = this;

    self.getRestaurants = getRestaurants;
    self.reverseSort = false;
    self.setColumnSorting = setColumnSorting;
    self.sortBy = null;

    ////////////

    self.getRestaurants();

    function getRestaurants() {
      restaurants.query().$promise.then(function (response) {
        self.restaurants = response;
      });
    }

    function setColumnSorting(newSortBy) {
      self.reverseSort = (newSortBy === self.sortBy) ? !self.reverseSort : false;
      self.sortBy = newSortBy;
    }


  }
})();
