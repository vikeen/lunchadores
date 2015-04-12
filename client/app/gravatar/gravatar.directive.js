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
      controllerAs: 'GravatarCtrl',
      controller: 'GravatarCtrl',
      link: link
    };
  }

  function link(scope, element) {
    scope.$watch('GravatarCtrl.imageSrc', function(newValue) {
      if (newValue) {
        $(element).attr('src', scope.GravatarCtrl.imageSrc);
      }
    });
  }
})();
