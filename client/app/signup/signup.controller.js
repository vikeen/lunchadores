(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('SignupCtrl', SignupCtrl);

    function SignupCtrl(Auth, $location) {
        var self = this;

        self.errors = [];
        self.signupFormSubmit = false;
        self.user = {};

        self.register = register;

        ////////////

        function register(form) {
            self.errors = [];
            self.signupFormSubmit = true;

            if (form.$valid) {
                Auth.createUser({
                    first_name: self.user.first_name,
                    last_name: self.user.first_name,
                    email_address: self.user.email_address,
                    password: self.user.password
                }).then(function () {
                    $location.path('/');
                }).catch(function (err) {
                    self.errors.push(err.data);
                }).finally(function () {
                    self.signupFormSubmit = false;
                });
            }
        }
    }
})();
