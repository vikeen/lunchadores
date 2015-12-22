(function () {
    'use strict';

    angular.module('lunchadoresApp').controller('AdminCtrl', AdminCtrl);

    AdminCtrl.$inject = ["User"];
    function AdminCtrl(User) {
        var self = this;

        self.users = [];

        activate();

        ////////////

        function activate() {
            self.users = User.query();
        }
    }
})();
