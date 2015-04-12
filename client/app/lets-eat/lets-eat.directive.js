(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresLetsEat', LetsEatDirective);

  function LetsEatDirective() {
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
})();
