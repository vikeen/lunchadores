(function () {
  'use strict';

  angular.module('lunchadoresApp').factory('User', UserFactory);

  function UserFactory($resource) {
    function buildURL(url) {
      return '/api/user' + url;
    }

    return $resource(buildURL('/:id/:controller'), {
        id: '@id'
      },
      {
        passwordReset: {
          method: 'POST',
          url: '/api/password-reset'
        },
        passwordResetVerification: {
          method: 'POST',
          url: '/api/password-reset/:verificationId'
        },
        changePassword: {
          method: 'PUT',
          params: {
            controller: 'password'
          }
        },
        updateProfile: {
          method: 'PUT'
        },
        get: {
          method: 'GET',
          params: {
            id: 'me'
          }
        }
      });
  }
})();
