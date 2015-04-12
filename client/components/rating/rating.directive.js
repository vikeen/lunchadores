(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresRating', RatingDirective);

  function RatingDirective() {
    return {
      restrict: 'EA',
      scope: {
        ratingValue: '='
      },
      templateUrl: 'components/rating/rating.html',
      controllerAs: 'RatingCtrl',
      controller: function () {},
      link: function () {}
    };
  }
})();
