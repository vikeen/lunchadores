(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresFormErrors', LunchadoresFormErrors);

  function LunchadoresFormErrors() {
    return {
      scope: {
        errors: '=errors'
      },
      restrict: 'E',
      templateUrl: 'components/forms/form-errors.html',
      link: link
    };

    function link() {}
  }
})();
