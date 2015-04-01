'use strict';

angular.module('lunchadoresApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('restaurants', {
        url: '/restaurants',
        templateUrl: 'app/restaurants/restaurants.html',
        controller: 'RestaurantsCtrl'
      })
      .state('restaurant', {
        url: '/restaurants/:id',
        templateUrl: 'app/restaurants/restaurant.html',
        controller: 'RestaurantCtrl'
      });
  });
