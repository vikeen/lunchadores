(function () {
    'use strict';

    angular.module('lunchadoresApp').directive('lunchadoresNotificationsBar', NotificationsDirective);

    function NotificationsDirective() {
        return {
            restrict: 'E',
            templateUrl: 'components/notifications/notifications.html',
            bindToController: true,
            controller: 'NotificationsCtrl',
            controllerAs: 'notificationsCtrl',
            link: link
        };
    }

    function link() {
    }
})();
