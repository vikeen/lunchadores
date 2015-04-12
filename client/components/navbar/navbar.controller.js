(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('NavbarCtrl', NavBarCtrl);

  function NavBarCtrl($scope, $location, Auth) {
    var self = this;

    self.getCurrentUser = Auth.getCurrentUser;

    self.logout = function () {
      Auth.logout();
      $location.path('/login');
    };

    self.isActive = function (route) {
      return route === $location.path();
    };
  }
})();
