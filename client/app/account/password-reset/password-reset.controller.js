(function () {
    /* jshint camelcase:false */
    'use strict';

    angular.module('lunchadoresApp').controller('PasswordResetCtrl', PasswordResetCtrl);

    PasswordResetCtrl.$inject = ["User", "toastService"];
    function PasswordResetCtrl(User, toastService) {
        var self = this;

        self.email_address = null;
        self.errors = [];
        self.passwordResetFormSubmit = false;

        self.sendEmail = sendEmail;

        ////////////

        function sendEmail(form) {
            self.errors = [];
            self.passwordResetFormSubmit = true;

            if (form.$valid) {
                User.passwordReset({email_address: self.email_address}).$promise
                    .then(function (response) {
                        toastService.success({
                            message: 'Check your email for further instructions.',
                        });
                    })
                    .catch(function (error) {
                        toastService.error({
                            message: 'Error completing your password reset request.',
                        });
                    })
                    .finally(function () {
                        self.passwordResetFormSubmit = false;
                    });
            }
        }
    }
})();
