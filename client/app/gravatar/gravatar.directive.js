(function() {
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
      controller: function ($rootScope, md5, Auth) {
        var self = this;

        self.buildImageSrc = buildImageSrc;
        self.imageSrc = '';

        $rootScope.$on('userLoginSuccess', function () {
          self.imageSrc = self.buildImageSrc();
        });

        ////////////

        function buildImageSrc() {
          return location.protocol + '//www.gravatar.com/avatar/' +
            md5.createHash(Auth.getCurrentUser().email_address) + '?' +
            [
              'size=' + self.gravatarSize,
              'default=' + self.gravatarDefault
            ].join('&');
        }
      },
      link: function (scope, element) {
        scope.$watch('GravatarCtrl.imageSrc', function(newValue, oldValue) {
          if (newValue) {
            $(element).attr('src', scope.GravatarCtrl.imageSrc);
          }
        });
      }
    };
  }
})();
