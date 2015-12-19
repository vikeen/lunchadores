(function () {
    'use strict';

    angular.module('lunchadoresApp').config(SettingsConfig);

    function SettingsConfig($stateProvider) {
        $stateProvider
            .state('signup', {
                url: '/signup',
                templateUrl: 'app/signup/signup.html',
                controller: 'SignupCtrl',
                controllerAs: 'signupCtrl'
            });
    }
})();
