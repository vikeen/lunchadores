(function () {
    'use strict';

    angular.module('lunchadoresApp').service('restaurants',
        function ($resource) {
            var baseUrl = 'api/restaurants';

            return $resource(baseUrl, {}, {
                query: {
                    method: 'GET',
                    url: baseUrl,
                    isArray: true
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
