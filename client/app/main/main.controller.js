'use strict';

angular.module('lunchadoresApp').controller('MainCtrl',
  function ($scope, restaurants) {
    restaurants.query().$promise.then(function(response) {
      $scope.restaurants = response;
    });
  }
);
