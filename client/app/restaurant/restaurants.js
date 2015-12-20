(function () {
    'use strict';

    angular.module('lunchadoresApp').config(RestaurantsConfig);

    function RestaurantsConfig($stateProvider) {
        $stateProvider
            .state('restaurant', {
                template: '<div ui-view></div>'
            })
            .state('restaurant.index', {
                url: '/restaurants',
                templateUrl: 'app/restaurant/restaurants.html',
                controller: 'RestaurantsCtrl',
                controllerAs: 'restaurantsCtrl'
            })
            .state('restaurant.show', {
                url: '/restaurants/:id',
                templateUrl: 'app/restaurant/restaurant.html',
                controller: 'RestaurantCtrl',
                controllerAs: 'restaurantCtrl'
            })
            .state('restaurant.create', {
                url: '/restaurant/create',
                templateUrl: 'app/restaurant/create/create.html',
                controller: 'RestaurantCreateCtrl',
                controllerAs: 'restaurantCreateCtrl'
            });
    }
})();
