(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('tabs', TabsDirective);

  function TabsDirective($rootScope) {
    return {
      restrict: 'A',
      controllerAs: 'tabsCtrl',
      controller: function () {
      },
      link: function (scope, element) {
        var _init = function () {
          $(element).find('.titles .title').on('click', function (event) {
            scope.activateTab($(event.currentTarget));
          });

          scope.activateTab($(element).find('.titles .title.active'));
        };

        scope.activateTab = function ($tab) {
          $(element).find('.titles .title').removeClass('active');
          $tab.addClass('active');

          $(element).find('.panes .pane').removeClass('active');
          $(element).find('.panes .pane[data-pane-content="' + $tab.data('paneId') + '"]').addClass('active');
        };

        // Needs to wait until after authentication for role hidden tabs
        $rootScope.isLoggedInAsync(function () {
          setTimeout(function () {
            _init();
          }, 250);
        });
      }
    };
  }
})();
