(function () {
    'use strict';

    angular.module('lunchadoresApp').factory('toastService', ToastService);

    ToastService.$inject = ['$mdToast'];
    function ToastService($mdToast) {
        return {
            success: success,
            error: error
        };

        /*
         * Public API
         */

        function success(args) {
            var toast = _toast(args);

            toast.theme("toast--success");

            return $mdToast.show(toast);
        }

        function error(args) {
            var toast = _toast(args);

            toast.theme("toast--error");

            return $mdToast.show(toast);
        }

        /*
         * Private API
         */

        function _toast(args) {
            var defaults = {
                hideDelay: 3000,
                position: 'bottom left',
                action: false,
                highlightAction: false,
                capsule: false
            };

            args = angular.extend(angular.copy(defaults), args);

            return $mdToast.simple()
                .textContent(args.message)
                .hideDelay(args.hideDelay)
                .action(args.action);
        }
    }
})();

