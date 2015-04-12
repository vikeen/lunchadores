(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('rating', RatingDirective);

  function RatingDirective() {
    return {
      restrict: 'EA',
      scope: {
        ratingValue: '='
      },
      templateUrl: 'components/rating/rating.html',
      controllerAs: 'ratingCtrl',
      controller: function () {},
      link: function ($scope, $element, $attr) {}
    };
  }
})();
