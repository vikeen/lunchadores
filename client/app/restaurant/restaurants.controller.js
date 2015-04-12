(function() {
  /* jshint camelcase: false */

  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantsCtrl',
    function ($scope, restaurants, notifications) {
      $scope.sortBy = null;
      $scope.reverseSort = false;

      $scope.setColumnSorting = function (newSortBy) {
        $scope.reverseSort = (newSortBy === $scope.sortBy) ? !$scope.reverseSort : false;
        $scope.sortBy = newSortBy;
      };

      restaurants.query().$promise.then(function (response) {
        $scope.restaurants = response;
      });
    }
  );
})();
