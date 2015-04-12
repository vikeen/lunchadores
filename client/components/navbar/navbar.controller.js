(function() {
  'use strict';

  angular.module('lunchadoresApp').controller('NavbarCtrl', NavBarCtrl);

  function NavBarCtrl($scope, $location, Auth) {
    var self = this;

    self.getCurrentUser = Auth.getCurrentUser;
    self.isActive = isActive;
    self.logout = logout;

    ////////////

    function isActive(route) {
      return route === $location.path();
    }

    function logout() {
      Auth.logout();
      $location.path('/login');
    }
  }
})();
