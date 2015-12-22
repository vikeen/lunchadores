(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('PasswordResetVerificationCtrl', PasswordResetVerificationCtrl);

    PasswordResetVerificationCtrl.$inject = ["$stateParams", "$location", "Auth", "User", "toastService"];
    function PasswordResetVerificationCtrl($stateParams, $location, Auth, User, toastService) {
        var self = this;

        self.email_address = null;
        self.errors = [];
        self.passwordResetVerificationFormSubmit = false;
        self.new_password = null;

        self.verify = verify;

        ////////////

        function verify(form) {
            self.errors = [];
            self.passwordResetVerificationFormSubmit = true;

            if (form.$valid) {
                User.passwordResetVerification({verificationId: $stateParams.verificationId}, {
                    new_password: self.new_password,
                    email_address: self.email_address
                }).$promise.then(function (response) {

                        toastService.success({
                            message: 'Password updated successfully.'
                        });

                        Auth.login({
                            email_address: self.email_address,
                            password: self.new_password
                        }).then(function () {
                            $location.path('/');
                        });
                    })
                    .catch(function () {
                        toastService.error({
                            message: 'Error resetting password.'
                        });
                    })
                    .finally(function () {
                        self.passwordResetVerificationFormSubmit = false;
                    });
            }
        }
    }
})();
