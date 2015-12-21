(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

    function RestaurantsCtrl(restaurants) {
        var vm = this;

        vm.restaurants = [];
        vm.restaurantsLoading = false;

        activate();

        ////////////

        function activate() {
            getActiveRestaurants();
        }

        function getActiveRestaurants() {
            vm.restaurantsLoading = true;
            restaurants.getActive().$promise
                .then(function (response) {
                    vm.restaurants = response;
                })
                .finally(function() {
                    vm.restaurantsLoading = false;
                });
        }
    }
})();
