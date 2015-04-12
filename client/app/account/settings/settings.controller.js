(function() {
  'use strict';

  angular.module('lunchadoresApp')
    .controller('SettingsCtrl', function ($scope, User, Auth, notifications) {
      $scope.user = Auth.getCurrentUser();

      $scope.updateUserProfile = function (form) {
        if (form.$valid) {
          User.updateProfile({id: $scope.user.id}, $scope.user).$promise
            .then(function () {
              notifications.showSuccess({
                message: 'Profile updated.',
                hide: true
              });
            })
            .catch(function () {
              notifications.showError({
                message: 'Error updating profile.',
                hide: true
              });
            })
        }
      };

      $scope.changePassword = function (form) {
        if (form.$valid) {
          Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
            .then(function () {
              notifications.showSuccess({
                message: 'Password changed.',
                hide: true
              });
            })
            .catch(function () {
              notifications.showError({
                message: 'Error changing password.',
                hide: true
              });
            })
            .finally(function () {
              $scope.user.oldPassword = null;
              $scope.user.newPassword = null;
            });
        }
      };
    });
})();
