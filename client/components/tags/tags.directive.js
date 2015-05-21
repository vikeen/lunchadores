(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresTags', TagsDirective);

  function TagsDirective() {
    return {
      scope: {
        isReadOnly: '=',
        tags: '='
      },
      restrict: 'E',
      templateUrl: 'components/tags/tags.html',
      link: link
    };

    function link(scope, element, attrs) {
      console.log(scope.tags, scope.isReadOnly);
    }
  }
})();
