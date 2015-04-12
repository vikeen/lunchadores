(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresNotificationsBar', NotificationsDirective);

  function NotificationsDirective() {
    return {
      restrict: 'EA',
      templateUrl: 'app/notifications/notifications.html',
      bindToController: true,
      controllerAs: 'NotificationsCtrl',
      controller: 'NotificationsCtrl',
      link: link
    };
  }

  function link() {}
})();
