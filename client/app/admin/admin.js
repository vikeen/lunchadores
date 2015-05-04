(function() {
  'use strict';

  angular.module('lunchadoresApp')
    .config(function ($stateProvider) {
      $stateProvider
        .state('admin', {
          url: '/admin',
          templateUrl: 'app/admin/admin.html',
          controller: 'AdminCtrl',
          controllerAs: 'adminCtrl',
          admin: true
        });
    });
})();
