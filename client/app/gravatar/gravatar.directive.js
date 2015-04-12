(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('gravatar',
    function () {
      return {
        restrict: 'A',
        scope: {
          gravatarSize: '@',
          gravatarDefault: '@'
        },
        controllerAs: 'gravatarCtrl',
        controller: function ($rootScope, $scope, md5, Auth) {
          $scope.gravatarImageSrc = '';

          $scope.$on('userLoginSuccess', function () {
            $scope.gravatarImageSrc = $scope.buildImageSrc();
          });

          // md5.createHash
          $scope.buildImageSrc = function () {
            return location.protocol + '//www.gravatar.com/avatar/' +
              md5.createHash(Auth.getCurrentUser().email_address) + '?' +
              [
                'size=' + $scope.gravatarSize,
                'default=' + $scope.gravatarDefault
              ].join('&');
          };
        },
        link: function (scope, element) {
          scope.$watch('gravatarImageSrc', function (newValue, oldValue) {
            if (!newValue) {
              return;
            }

            $(element).attr('src', newValue);
          });
        }
      };
    });
})();
