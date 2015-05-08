(function() {
  /* jshint camelcase:false */
  'use strict';

  angular.module('lunchadoresApp').controller('PasswordResetCtrl', PasswordResetCtrl);

  function PasswordResetCtrl(User, notifications) {
    var self = this;

    self.email_address = null;
    self.errors = [];

    self.sendEmail = sendEmail;

    ////////////

    function sendEmail(form) {
      self.errors = [];

      if (form.$valid) {
        User.passwordReset({ email_address: self.email_address}).$promise
          .then(function(response) {
            notifications.showSuccess({
              message: 'Check your email for further instructions.',
              hide: true
            });
          })
          .catch(function(error) {
            notifications.showError({
              message: 'Error completing your password reset request.',
              hide: true
            });
          });
      }
    }
  }
})();
