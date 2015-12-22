(function () {
    'use strict';

    angular.module('lunchadoresApp').config(RestaurantsConfig);

    function RestaurantsConfig($stateProvider) {
        $stateProvider
            .state('restaurants', {
                url: '/',
                templateUrl: 'app/restaurants/restaurants.html',
                controller: 'RestaurantsCtrl',
                controllerAs: 'restaurantsCtrl'
            });
    }
})();
