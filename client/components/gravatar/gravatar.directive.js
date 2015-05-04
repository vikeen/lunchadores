(function() {
  /* jshint camelcase:false */

  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresGravatar', GravatarDirective);

  function GravatarDirective() {
    return {
      restrict: 'EA',
      scope: {
        gravatarSize: '@',
        gravatarDefault: '@'
      },
      bindToController: true,
      controller: 'GravatarCtrl',
      controllerAs: 'gravatarCtrl',
      link: link
    };
  }

  function link(scope, element) {
    scope.$watch('gravatarCtrl.imageSrc', function(newValue) {
      if (newValue) {
        $(element).attr('src', scope.gravatarCtrl.imageSrc);
      }
    });
  }
})();
