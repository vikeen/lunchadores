(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('AdminCtrl', AdminCtrl);

    function AdminCtrl($http, Auth, User, restaurants, notifications) {
        var self = this;

        self.users = [];

        activate();

        ////////////

        function activate() {
            self.users = User.query();
        }
    }
})();
