(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('MainCtrl', MainCtrl);

    function MainCtrl($mdSidenav, $mdUtil, Auth) {
        var vm = this;

        vm.closeMenu = closeMenu;
        vm.mainNavigationComponentID = 'mainNavigation';
        vm.user = Auth.getCurrentUser();

        vm.toggleNavigation = _buildToggler(vm.mainNavigationComponentID);

        /*
         * Public API
         */

        function closeMenu() {
            $mdSidenav(vm.mainNavigationComponentID).close();
        }

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
