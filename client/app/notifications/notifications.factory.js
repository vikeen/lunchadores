(function() {
  'use strict';

  angular.module('lunchadoresApp').factory('notifications',
    function ($rootScope) {
      var showError = function (message) {
        $rootScope.$broadcast('notifications:error', message);
      };

      var showWarning = function (message) {
        $rootScope.$broadcast('notifications:warning', message);
      };

      var showSuccess = function (message) {
        $rootScope.$broadcast('notifications:success', message);
      };

      return {
        showError: showError,
        showWarning: showWarning,
        showSuccess: showSuccess
      };
    });
})();
