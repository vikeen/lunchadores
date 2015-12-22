(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

    RestaurantsCtrl.$inject = ["$rootScope", "toastService", "restaurants"];
    function RestaurantsCtrl($rootScope, toastService, restaurants) {
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
                if (e === "unsupported") {
                    return;
                }

                if (e === "denied") {
                    toastService.error({
                        message: "Geolocation is disabled for your device. We use geolocation to increase your foodie experience.",
                        hideDelay: false,
                        action: "ok"
                    });
                }
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
