(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresSubmitButton', SubmitButtonDirective);

  function SubmitButtonDirective() {
    return {
      scope: {
        isSubmit: '=',
        buttonText: '@'
      },
      restrict: 'E',
      templateUrl: 'components/forms/submit-button/submit-button.html',
      link: link
    };

    function link() {}
  }
})();
