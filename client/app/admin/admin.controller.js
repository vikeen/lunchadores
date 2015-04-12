(function() {
  'use strict';

  angular.module('lunchadoresApp')
    .controller('AdminCtrl', function ($scope, $http, Auth, User, restaurants, notifications) {

      // Use the User $resource to fetch all users
      $scope.users = User.query();

      $scope.deleteUser = function (user) {
        User.remove({id: user.id}).$promise.then(function (response) {
          angular.forEach($scope.users, function (u, i) {
            if (u === user) {
              $scope.users.splice(i, 1);
            }
          });

          notifications.showSuccess({
            message: 'Removed user: "' + $scope.user.fullName + '".',
            hide: true
          });
        });
      };

      $scope.restaurants = restaurants.query();

      $scope.deleteRestaurant = function (restaurant) {
        if (window.confirm("Remove restaurant: " + restaurant.name + "?")) {
          restaurants.delete({id: restaurant.id}).$promise.then(function (response) {
            angular.forEach($scope.restaurants, function (u, i) {
              if (u === restaurant) {
                $scope.restaurants.splice(i, 1);
              }
            });

            notifications.showSuccess({
              message: 'Removed restaurant "' + restaurant.name + '".',
              hide: true
            });
          });
        }
      };
    });
})();
