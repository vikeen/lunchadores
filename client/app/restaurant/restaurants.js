(function() {
  'use strict';

  angular.module('lunchadoresApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('restaurant', {
          template: '<div ui-view></div>'
        })
        .state('restaurant.index', {
          url: '/restaurant',
          templateUrl: 'app/restaurant/restaurants.html',
          controller: 'RestaurantsCtrl',
          controllerAs: 'RestaurantsCtrl'
        })
        .state('restaurant.show', {
          url: '/restaurant/:id',
          templateUrl: 'app/restaurant/restaurant.html',
          controller: 'RestaurantCtrl',
          controllerAs: 'RestaurantCtrl'
        })
        .state('restaurant.create', {
          url: '/restaurant/create',
          templateUrl: 'app/restaurant/restaurant-create.html',
          controller: 'RestaurantCreateCtrl',
          controllerAs: 'RestaurantCreateCtrl'
        });
    });
})();
