(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('notificationsBar',
    function (notificationsConfig, $timeout, $cookieStore) {
      return {
        restrict: 'EA',
        templateUrl: 'app/notifications/notifications.html',
        link: function (scope) {
          var notifications = scope.notifications = [];

          var removeById = function (id) {
            var found = -1;

            notifications.forEach(function (el, index) {
              if (el.id === id) {
                found = index;
              }
            });

            if (found >= 0) {
              notifications.splice(found, 1);
            }
          };

          var notificationHandler = function (event, data, type) {
            var hideDelay = data.hideDelay || notificationsConfig.getHideDelay(),
              hide = (typeof data.hide === 'undefined') ? notificationsConfig.getAutoHide() : !!data.hide,
              saveResponse = data.saveResponse || notificationsConfig.getSaveResponse();

            if (saveResponse && !data.id) {
              console.error('notification error: must supply an \'id\' parameter with to in order to save the user response');
              return;
            }

            var id = 'notif_' + String(data.id || Math.floor(Math.random() * 128));

            var ignoreNotifications = $cookieStore.get('notificationsToIgnore') || {};
            if (ignoreNotifications[id]) {
              // this notification was previously ignored by the user
              return;
            }

            notifications.push({
              id: id,
              type: type,
              message: data.message,
              ignore: saveResponse
            });

            if (hide) {
              var timer = $timeout(function () {
                removeById(id);
                $timeout.cancel(timer);
              }, hideDelay);
            }
          };

          scope.$on('notifications:error', function (event, data) {
            notificationHandler(event, data, 'error');
          });

          scope.$on('notifications:warning', function (event, data) {
            notificationHandler(event, data, 'warning');
          });

          scope.$on('notifications:success', function (event, data) {
            notificationHandler(event, data, 'success');
          });

          scope.close = function (index) {
            if (notifications[index].ignore) {
              var currentIgnoreIDs = $cookieStore.get('notificationsToIgnore') || {};
              currentIgnoreIDs[notifications[index].id] = true;
              $cookieStore.put('notificationsToIgnore', currentIgnoreIDs);
            }

            notifications.splice(index, 1);
          };
        }
      };
    }
  );
})();
