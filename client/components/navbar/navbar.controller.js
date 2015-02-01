'use strict';

angular.module('lunchadoresApp')
  .controller('NavbarCtrl', function ($scope, $location, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
      Auth.logout();
      $location.path('/login');
    };

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
