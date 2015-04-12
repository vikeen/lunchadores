(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresNotificationsBar', NotificationsDirective);

  function NotificationsDirective(notificationsConfig, $timeout, $cookieStore) {
    return {
      restrict: 'EA',
      templateUrl: 'app/notifications/notifications.html',
      bindToController: true,
      controllerAs: 'NotificationsController',
      controller: NotificationsController,
      link: link
    };

    function NotificationsController($rootScope) {
      var self = this;

      self.close = close;
      self.notifications = [];
      self.notificationHandler = notificationHandler;
      self.removeById = removeById;

      active();

      ////////////

      function active() {
        $rootScope.$on('notifications:error', function (event, data) { self.notificationHandler(event, data, 'error'); });
        $rootScope.$on('notifications:warning', function (event, data) { self.notificationHandler(event, data, 'warning'); });
        $rootScope.$on('notifications:success', function (event, data) { self.notificationHandler(event, data, 'success'); });
      }

      function close(index) {
        if (notifications[index].ignore) {
          var currentIgnoreIDs = $cookieStore.get('notificationsToIgnore') || {};
          currentIgnoreIDs[self.notifications[index].id] = true;
          $cookieStore.put('notificationsToIgnore', currentIgnoreIDs);
        }

        self.notifications.splice(index, 1);
      }

      function notificationHandler(event, data, type) {
        var hideDelay = data.hideDelay || notificationsConfig.getHideDelay(),
          hide = (typeof data.hide === 'undefined') ? notificationsConfig.getAutoHide() : !!data.hide,
          saveResponse = data.saveResponse || notificationsConfig.getSaveResponse();

        if (saveResponse && !data.id) {
          console.error('notification error: must supply an \'id\' parameter with to in order to save the user response');
          return;
        }

        var id = 'notif_' + String(data.id || Date.now());

        var ignoreNotifications = $cookieStore.get('notificationsToIgnore') || {};
        if (ignoreNotifications[id]) {
          // this notification was previously ignored by the user
          return;
        }

        self.notifications.push({
          id: id,
          type: type,
          message: data.message,
          ignore: saveResponse
        });

        if (hide) {
          var timer = $timeout(function () {
            self.removeById(id);
            $timeout.cancel(timer);
          }, hideDelay);
        }
      }

      function removeById(id) {
        self.notifications.forEach(function (el, index) {
          if (el.id === id) {
            self.notifications.splice(index, 1);
          }
        });
      }
    }

    function link(scope, element, attrs) {}
  }
})();
