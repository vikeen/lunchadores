(function() {
  'use strict';

  angular.module('lunchadoresApp').config(LoginConfig);

  function LoginConfig($stateProvider) {
    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'app/account/login/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'loginCtrl'
      })
  }
})();
