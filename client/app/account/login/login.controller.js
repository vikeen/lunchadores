(function () {
    /* jshint camelcase:false */
    'use strict';

    angular.module('lunchadoresApp').controller('LoginCtrl', LoginCtrl);

    function LoginCtrl(Auth, $location) {
        var self = this;

        self.errors = [];
        self.login = login;
        self.loginFormSubmit = false;
        self.user = {};

        ////////////

        function login(form) {
            self.errors = [];
            self.loginFormSubmit = true;

            if (form.$valid) {
                Auth.login({
                    email_address: self.user.email_address,
                    password: self.user.password
                }).then(function () {
                    $location.path('/');
                }).catch(function (err) {
                    self.errors.push(err);
                }).finally(function () {
                    self.loginFormSubmit = false;
                });
            }
        }
    }
})();
