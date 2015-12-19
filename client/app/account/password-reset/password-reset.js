(function () {
    'use strict';

    angular.module('lunchadoresApp').config(PasswordResetConfig);

    function PasswordResetConfig($stateProvider) {
        $stateProvider
            .state('password-reset', {
                url: '/password-reset',
                templateUrl: 'app/account/password-reset/password-reset.html',
                controller: 'PasswordResetCtrl',
                controllerAs: 'passwordResetCtrl'
            })
            .state('password-reset-verification', {
                url: '/password-reset/:verificationId',
                templateUrl: 'app/account/password-reset/password-reset-verification.html',
                controller: 'PasswordResetVerificationCtrl',
                controllerAs: 'passwordResetVerificationCtrl'
            });
    }
})();
