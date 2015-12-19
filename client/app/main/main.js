(function () {
    'use strict';

    angular.module('lunchadoresApp')
        .config(function ($stateProvider) {
            $stateProvider
                .state('main', {
                    url: '/',
                    templateUrl: 'app/main/main.html',
                    controller: 'MainCtrl',
                    controllerAs: 'mainCtrl'
                });
        });
})();
