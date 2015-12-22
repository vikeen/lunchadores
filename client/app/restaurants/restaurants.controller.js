(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

    RestaurantsCtrl.$inject = ["$rootScope", "restaurants"];
    function RestaurantsCtrl($rootScope, restaurants) {
        var vm = this;

        vm.restaurants = [];
        vm.restaurantsLoading = false;
        vm.geolocation = null;

        activate();

        ////////////

        function activate() {
            vm.restaurantsLoading = true;

            $rootScope.geolocationPromise.then(function (response) {
                vm.geolocation = response;
                getRestaurants(vm.geolocation.coords.latitude, vm.geolocation.coords.longitude);
            }).catch(function (e) {
                console.error(e);
            });
        }

        function getRestaurants(lat, lng) {
            vm.restaurantsLoading = true;

            restaurants.query({
                opennow: true,
                location: [lat, lng].join(",")
            }).$promise
                .then(function (response) {
                    vm.restaurants = response;
                })
                .finally(function () {
                    vm.restaurantsLoading = false;
                });
        }
    }
})();
