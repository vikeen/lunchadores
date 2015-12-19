(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('SettingsCtrl', SettingsCtrl);

    function SettingsCtrl(User, Auth, notifications) {
        var self = this;

        self.changePasswordErrors = [];
        self.changePasswordFormSubmit = false;

        self.userProfileErrors = [];
        self.userProfileFormSubmit = false;
        self.user = {};

        self.changePassword = changePassword;
        self.updateUserProfile = updateUserProfile;

        activate();

        ////////////

        function activate() {
            self.user = Auth.getCurrentUser();
        }

        function updateUserProfile(form) {
            self.userProfileErrors = [];
            self.userProfileFormSubmit = true;

            if (form.$valid) {
                User.updateProfile({id: self.user.id}, self.user).$promise
                    .then(function () {
                        notifications.showSuccess({
                            message: 'Profile updated.',
                            hide: true
                        });
                    })
                    .catch(function () {
                        notifications.showError({
                            message: 'Error updating profile.',
                            hide: true
                        });
                    })
                    .finally(function () {
                        self.userProfileFormSubmit = false;
                    });
            }
        }

        function changePassword(form) {
            self.changePasswordFormSubmit = true;
            self.changePasswordErrors = [];

            if (form.$valid) {
                Auth.changePassword(self.user.oldPassword, self.user.newPassword)
                    .then(function () {
                        notifications.showSuccess({
                            message: 'Password changed.',
                            hide: true
                        });
                    })
                    .catch(function () {
                        self.changePasswordErrors.push({message: 'Error changing password'});
                    })
                    .finally(function () {
                        self.changePasswordFormSubmit = false;
                        self.user.oldPassword = null;
                        self.user.newPassword = null;
                    });
            }
        }
    }
})();
