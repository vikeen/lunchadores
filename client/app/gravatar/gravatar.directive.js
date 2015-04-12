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
      controller: GravatarController,
      link: link
    };
  }

  function GravatarController($rootScope, md5, Auth) {
    var self = this;

    self.buildImageSrc = buildImageSrc;
    self.imageSrc = '';

    activate();

    ////////////

    function activate() {
      $rootScope.$on('userLoginSuccess', function () {
        self.imageSrc = self.buildImageSrc();
      });
    }

    function buildImageSrc() {
      return location.protocol + '//www.gravatar.com/avatar/' +
        md5.createHash(Auth.getCurrentUser().email_address) + '?' +
        [
          'size=' + self.gravatarSize,
          'default=' + self.gravatarDefault
        ].join('&');
    }
  }

  function link(scope, element) {
    scope.$watch('GravatarCtrl.imageSrc', function(newValue) {
      if (newValue) {
        $(element).attr('src', scope.GravatarCtrl.imageSrc);
      }
    });
  }
})();
