/* jshint camelcase: false */

(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('GravatarCtrl', GravatarController);

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
})();
