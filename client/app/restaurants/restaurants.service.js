'use strict';

angular.module('lunchadoresApp').service('restaurants',
  function ($resource) {
    var baseUrl = 'api/restaurants';

    return $resource(baseUrl, {}, {
      update: {
        method: 'PUT',
        url: baseUrl + '/:id',
        params: {
          id: '@id'
        }
      },
      delete: {
        method: 'DELETE',
        url: baseUrl + '/:id',
        params: {
          id: '@id'
        }
      },
      rate: {
        method: 'POST',
        url: baseUrl + '/:id/rate/:rating',
        params: {
          id: '@id',
          rating: '@rating'
        }
      },
      get: {
        method: 'GET',
        url: baseUrl + '/:id',
        id: '@id'
      }
    });
  }
);
