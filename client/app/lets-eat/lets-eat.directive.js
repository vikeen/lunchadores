(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('letsEat',
    function () {
      return {
        restrict: 'EA',
        scope: {
          restaurants: '='
        },
        bindToController: true,
        templateUrl: 'app/lets-eat/lets-eat.html',
        controllerAs: 'LetsEatCtrl',
        controller: 'LetsEatCtrl',
        link: function ($scope, $element, $attr) {}
      };
    }
  );
})();
