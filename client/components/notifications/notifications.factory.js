(function () {
    'use strict';

    angular.module('lunchadoresApp').factory('notifications', NotificationsFactory);

    function NotificationsFactory($rootScope) {
        return {
            showError: showError,
            showWarning: showWarning,
            showSuccess: showSuccess
        };

        function showError(message) {
            $rootScope.$broadcast('notifications:error', message);
        }

        function showWarning(message) {
            $rootScope.$broadcast('notifications:warning', message);
        }

        function showSuccess(message) {
            $rootScope.$broadcast('notifications:success', message);
        }
    }
})();
