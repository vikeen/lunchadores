(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('SignupCtrl', SignupCtrl);
  function SignupCtrl(Auth, $location) {
    var self = this;

    self.user = {};
    self.errors = [];

    self.register = function (form) {
      self.submitted = true;
      self.errors = [];

      if (form.$valid) {
        Auth.createUser({
          first_name: self.user.first_name,
          last_name: self.user.first_name,
          email_address: self.user.email_address,
          password: self.user.password
        })
          .then(function () {
            // Account created, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            self.errors.push(err.data);
          });
      }
    };
  }
})();
