(function () {
  'use strict';

  angular.module('lunchadoresApp').controller('NavbarCtrl', NavBarCtrl);

  function NavBarCtrl($location, $mdSidenav, Auth) {
    var self = this;

    self.getCurrentUser = Auth.getCurrentUser;
    self.isActive = isActive;
    self.logout = logout;

    ////////////

    /*
     * Public API
     */

    function isActive(route) {
      return route === $location.path();
    }

    function logout() {
      Auth.logout();
      $location.path('/login');
    }

    /*
     * Private API
     */
  }
})();
