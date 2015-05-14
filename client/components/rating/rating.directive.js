(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresRating', RatingDirective);

  function RatingDirective() {
    return {
      restrict: 'E',
      scope: {
        ratingValue: '='
      },
      templateUrl: 'components/rating/rating.html',
      link: function () {}
    };
  }
})();
