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
      templateUrl: 'components/lets-eat/lets-eat.html',
      controllerAs: 'LetsEatCtrl',
      controller: 'LetsEatCtrl',
      link: link
    };

    function link() {}
  }
})();
