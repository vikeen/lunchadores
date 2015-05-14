(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('AdminCtrl', AdminCtrl);

  function AdminCtrl($http, Auth, User, restaurants, notifications) {
    var self = this;

    self.deleteRestaurant = deleteRestaurant;
    self.deleteUser = deleteUser;
    self.users = undefined;
    self.restaurants = undefined;

    activate();

    ////////////

    function activate() {
      self.users = User.query();
      self.restaurants = restaurants.query();
    }

    function deleteUser(user) {
      if (window.confirm('Remove user: ' + user.full_name + '?')) {
        User.remove({id: user.id}).$promise.then(function () {
          angular.forEach(self.users, function (u, i) {
            if (u === user) {
              self.users.splice(i, 1);
            }
          });

          notifications.showSuccess({
            message: 'Removed user: "' + self.user.fullName + '".',
            hide: true
          });
        });
      }
    }


    function deleteRestaurant(restaurant) {
      if (window.confirm('Remove restaurant: ' + restaurant.name + '?')) {
        restaurants.delete({id: restaurant.id}).$promise.then(function () {
          angular.forEach(function (u, i) {
            if (u === restaurant) {
              self.restaurants.splice(i, 1);
            }
          });


          notifications.showSuccess({
            message: 'Removed restaurant "' + restaurant.name + '".',
            hide: true
          });
        });
      }
    }
  }
})();
