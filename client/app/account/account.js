(function () {
    'use strict';

    angular.module('lunchadoresApp').config(AccountConfig);

    function AccountConfig($stateProvider) {
        $stateProvider
            .state('account', {
                abstract: true,
                views: {
                    '': {
                        template: '<div ui-view></div>'
                    }
                }
            })

            /*
             * Password Reset
             */
            .state('account.password-reset', {
                url: '/account/password-reset',
                templateUrl: 'app/account/password-reset/password-reset.html',
                controller: 'PasswordResetCtrl',
                controllerAs: 'passwordResetCtrl'
            })
            .state('account.password-reset-verification', {
                url: '/account/password-reset/:verificationId',
                templateUrl: 'app/account/password-reset/password-reset-verification.html',
                controller: 'PasswordResetVerificationCtrl',
                controllerAs: 'passwordResetVerificationCtrl'
            })

            /*
             * Settings
             */
            .state('account.settings', {
                url: '/account/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'settingsCtrl',
                authenticate: true
            });
    }
})();
