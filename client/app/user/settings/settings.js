(function () {
    'use strict';

    angular.module('lunchadoresApp').config(SettingsConfig);

    function SettingsConfig($stateProvider) {
        $stateProvider
            .state('settings', {
                url: '/user/:id/settings',
                templateUrl: 'app/user/settings/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'settingsCtrl',
                authenticate: true
            });
    }
})();
