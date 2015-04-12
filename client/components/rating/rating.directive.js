(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('rating', RatingDirective);

  function RatingDirective() {
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
})();
