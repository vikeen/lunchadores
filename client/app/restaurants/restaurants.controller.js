(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('RestaurantsCtrl', RestaurantsCtrl);

    function RestaurantsCtrl(restaurants) {
        var self = this;

        self.reverseSort = false;
        self.setColumnSorting = setColumnSorting;
        self.sortBy = null;

        activate();

        ////////////

        function activate() {
            getActiveRestaurants();
        }

        function getActiveRestaurants() {
            restaurants.getActive().$promise.then(function (response) {
                self.restaurants = response;
            });
        }

        function setColumnSorting(newSortBy) {
            self.reverseSort = (newSortBy === self.sortBy) ? !self.reverseSort : false;
            self.sortBy = newSortBy;
        }


    }
})();
