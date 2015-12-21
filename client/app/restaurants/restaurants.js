(function () {
    'use strict';

    angular.module('lunchadoresApp').config(RestaurantsConfig);

    function RestaurantsConfig($stateProvider) {
        $stateProvider
        //.state('restaurant', {
        //    abstract: true,
        //    template: '<div ui-view></div>'
        //})
            .state('restaurants', {
                url: '/',
                templateUrl: 'app/restaurants/restaurants.html',
                controller: 'RestaurantsCtrl',
                controllerAs: 'restaurantsCtrl'
            })
            .state('restaurant', {
                url: '/restaurants/:id',
                templateUrl: 'app/restaurants/restaurant/restaurant.html',
                controller: 'RestaurantCtrl',
                controllerAs: 'restaurantCtrl'
            })
        //.state('restaurant.create', {
        //    url: '/restaurant/create',
        //    templateUrl: 'app/restaurants/create/create.html',
        //    controller: 'RestaurantCreateCtrl',
        //    controllerAs: 'restaurantCreateCtrl'
        //});
    }
})();
