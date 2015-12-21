(function () {
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
