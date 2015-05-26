(function () {
  'use strict';

  angular.module('lunchadoresApp').controller('MainCtrl', MainCtrl);

  function MainCtrl($mdSidenav, $mdUtil) {
    var vm = this;

    vm.mainNavigationComponentID = 'mainNavigation';

    vm.toggleNavigation = _buildToggler(vm.mainNavigationComponentID);

    /*
     * Public API
     */

    /*
     * Private API
     */

    function activate() {
    }

    function _buildToggler(navID) {
      var debounceFn = $mdUtil.debounce(function () {
        $mdSidenav(navID).toggle();
      }, 300);
      return debounceFn;
    }
  }
})();
