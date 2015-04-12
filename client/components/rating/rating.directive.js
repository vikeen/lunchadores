(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('rating',
    function () {
      return {
        restrict: 'EA',
        scope: {
          ratingValue: '=ratingValue'
        },
        templateUrl: 'components/rating/rating.html',
        controllerAs: 'ratingCtrl',
        controller: function ($rootScope, $scope) {

        },
        link: function ($scope, $element, $attr) {
        }
      };
    }
  );
})();
