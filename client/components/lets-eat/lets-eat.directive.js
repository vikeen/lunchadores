(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresLetsEat', LetsEatDirective);

  function LetsEatDirective() {
    return {
      restrict: 'E',
      scope: {
        restaurants: '='
      },
      templateUrl: 'components/lets-eat/lets-eat.html',
      bindToController: true,
      controller: 'LetsEatCtrl',
      controllerAs: 'letsEatCtrl',
      link: link
    };

    function link() {}
  }
})();
