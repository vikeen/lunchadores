(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('PasswordResetVerificationCtrl', PasswordResetVerificationCtrl);

    function PasswordResetVerificationCtrl($stateParams, $location, Auth, User, notifications) {
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
                        notifications.showSuccess({
                            message: 'Password updated successfully.',
                            hide: true
                        });

                        Auth.login({
                            email_address: self.email_address,
                            password: self.new_password
                        }).then(function () {
                            $location.path('/');
                        });
                    })
                    .catch(function () {
                        notifications.showError({
                            message: 'Error resetting password.',
                            hide: true
                        });
                    })
                    .finally(function () {
                        self.passwordResetVerificationFormSubmit = false;
                    });
            }
        }
    }
})();
