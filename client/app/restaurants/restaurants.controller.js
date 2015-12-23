(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

    RestaurantsCtrl.$inject = ["$rootScope", "toastService", "restaurants", "geolocationService"];
    function RestaurantsCtrl($rootScope, toastService, restaurants, geolocationService) {
        var vm = this;

        vm.filterModel = {
            address: "",
            opennow: true
        };
        vm.restaurants = [];
        vm.restaurantsLoading = false;
        vm.geolocation = {
            latitude: null,
            longitude: null
        };

        vm.filterRestaurants = filterRestaurants;

        activate();

        ////////////

        function activate() {
            vm.restaurantsLoading = true;

            $rootScope.geolocationPromise.then(function (response) {
                vm.geolocation.latitude = response.coords.latitude;
                vm.geolocation.longitude = response.coords.longitude;

                getAddressFromGeolocation(vm.geolocation.latitude, vm.geolocation.longitude);
                getRestaurantsFromGeolocation(vm.geolocation.latitude, vm.geolocation.longitude);
            }).catch(function (e) {
                vm.restaurantsLoading = false;

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

        function filterRestaurants(form) {
            if (form.$valid) {
                geolocationService.byAddress({
                    address: vm.filterModel.address
                }).$promise.then(function (response) {
                        vm.filterModel.address = response.results[0].formatted_address;
                        vm.geolocation.latitude = response.results[0].geometry.location.lat;
                        vm.geolocation.longitude = response.results[0].geometry.location.lng;

                        getRestaurantsFromGeolocation(vm.geolocation.latitude, vm.geolocation.longitude);
                    })
                    .catch(function (e) {
                        console.error(e);
                    });
            }
        }

        function getRestaurantsFromGeolocation(lat, lng) {
            vm.restaurantsLoading = true;

            var query = {
                location: [lat, lng].join(",")
            };

            if (vm.filterModel.opennow) {
                query.opennow = true;
            }

            restaurants.query(query).$promise
                .then(function (response) {
                    vm.restaurants = response.results;
                })
                .finally(function () {
                    vm.restaurantsLoading = false;
                });
        }

        function getAddressFromGeolocation(lat, lng) {
            geolocationService.getAddress({
                location: [lat, lng].join(",")
            }).$promise.then(function (response) {
                vm.filterModel.address = response.results[0].formatted_address;
            }).catch(function (e) {
                console.error(e);
            });
        }
    }
})();
