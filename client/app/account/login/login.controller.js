(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('LoginCtrl', LoginCtrl);

  function LoginCtrl(Auth, $location) {
    var self = this;

    self.user = {};

    self.login = function (form) {
      self.submitted = true;

      if (form.$valid) {
        Auth.login({
          email_address: self.user.email_address,
          password: self.user.password
        })
          .then(function () {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            self.loginError = err.message;
          });
      }
    };
  }
})();
