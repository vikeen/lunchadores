'use strict';

angular.module('lunchadoresApp').service('restaurants',
  function ($resource) {
    var baseUrl = 'api/restaurants';

    return $resource(baseUrl, {}, {
      delete: {
        method: 'DELETE',
        url: baseUrl + '/:id',
        params: {
          id: '@id'
        }
      }
    });
  }
);
