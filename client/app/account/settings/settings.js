(function () {
    'use strict';

    angular.module('lunchadoresApp').config(SettingsConfig);

    function SettingsConfig($stateProvider) {
        $stateProvider
            .state('settings', {
                url: '/settings',
                templateUrl: 'app/account/settings/settings.html',
                controller: 'SettingsCtrl',
                controllerAs: 'settingsCtrl',
                authenticate: true
            });
    }
})();
