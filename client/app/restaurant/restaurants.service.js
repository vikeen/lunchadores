(function() {
  'use strict';

  angular.module('lunchadoresApp').service('restaurants',
    function ($resource) {
      var baseUrl = 'api/restaurant';

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
        getActive: {
          method: 'GET',
          url: baseUrl,
          isArray: true,
          params: {
            active: true
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
})();
