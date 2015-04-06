'use strict';

angular.module('lunchadoresApp')
  .factory('User', function ($resource) {
    return $resource('/api/user/:id/:controller', {
      id: '@id'
    },
    {
      changePassword: {
        method: 'PUT',
        params: {
          controller:'password'
        }
      },
      updateProfile: {
        method: 'PUT'
      },
      get: {
        method: 'GET',
        params: {
          id:'me'
        }
      }
	  });
  });
