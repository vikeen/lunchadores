(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresLoadingIcon', LoadingIconDirective);

  function LoadingIconDirective() {
    return {
      scope: {
        isLoading: '=isLoading'
      },
      restrict: 'E',
      templateUrl: 'components/utility/loading-icon/loading-icon.html',
      link: link
    };

    function link() {}
  }
})();
