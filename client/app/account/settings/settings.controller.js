(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('SettingsCtrl', SettingsCtrl);

    SettingsCtrl.$inject = ["User", "Auth", "toastService"];
    function SettingsCtrl(User, Auth, toastService) {
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
                        toastService.success({
                            message: 'Profile updated.'
                        });
                    })
                    .catch(function () {
                        toastService.error({
                            message: 'Error updating profile.'
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
                        toastService.success({
                            message: 'Password changed.'
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
