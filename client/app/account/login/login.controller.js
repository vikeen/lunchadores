(function() {
  'use strict';

  angular.module('lunchadoresApp')
    .controller('LoginCtrl', function ($scope, Auth, $location) {
      $scope.user = {};
      $scope.errors = {};

      $scope.login = function (form) {
        $scope.submitted = true;

        if (form.$valid) {
          Auth.login({
            email_address: $scope.user.email_address,
            password: $scope.user.password
          })
            .then(function () {
              // Logged in, redirect to home
              $location.path('/');
            })
            .catch(function (err) {
              $scope.loginError = err.message;
            });
        }
      };

    });
})();
