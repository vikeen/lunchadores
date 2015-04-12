(function() {
  'use strict';

  angular.module('lunchadoresApp')
    .controller('SignupCtrl', function ($scope, Auth, $location) {
      $scope.user = {};
      $scope.errors = {};

      $scope.register = function (form) {
        $scope.submitted = true;

        if (form.$valid) {
          Auth.createUser({
            first_name: $scope.user.first_name,
            last_name: $scope.user.first_name,
            email_address: $scope.user.email_address,
            password: $scope.user.password
          })
            .then(function () {
              // Account created, redirect to home
              $location.path('/');
            })
            .catch(function (err) {
              err = err.data;
              $scope.errors = {};
            });
        }
      };

    });
})();
