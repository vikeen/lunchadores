(function () {
    'use strict';

    angular.module('lunchadoresApp').config(SettingsConfig);

    function SettingsConfig($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/account/signup/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'signupCtrl'
            });
    }
})();
