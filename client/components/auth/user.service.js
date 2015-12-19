(function () {
  'use strict';

  angular.module('lunchadoresApp').factory('User', UserFactory);

  function UserFactory($resource) {
    function buildURL(url) {
      return '/api/users' + url;
    }

    return $resource(buildURL('/:id/:controller'), {
        id: '@id'
      },
      {
        passwordReset: {
          method: 'POST',
          url: '/api/password-resets'
        },
        passwordResetVerification: {
          method: 'POST',
          url: '/api/password-resets/:verificationId'
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
