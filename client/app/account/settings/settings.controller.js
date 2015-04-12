(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('SettingsCtrl', SettingsCtrl);

  function SettingsCtrl(User, Auth, notifications) {
    var self = this;

    self.changePassword = changePassword;
    self.updateUserProfile = updateUserProfile;
    self.user = undefined;

    activate();

    ////////////

    function activate() {
      self.user = Auth.getCurrentUser();
    }

    function updateUserProfile(form) {
      if (form.$valid) {
        User.updateProfile({id: self.user.id}, self.user).$promise
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
    }

    function changePassword(form) {
      if (form.$valid) {
        Auth.changePassword(self.user.oldPassword, self.user.newPassword)
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
            self.user.oldPassword = null;
            self.user.newPassword = null;
          });
      }
    }
  }
})();
