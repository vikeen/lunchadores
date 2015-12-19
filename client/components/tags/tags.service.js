(function () {
    'use strict';

    angular.module('lunchadoresApp').service('tags', TagsService);

    TagsService.$inject = ['$resource'];
    function TagsService($resource) {
        return $resource('/api/tags', {}, {
            getAllTags: {
                method: 'GET',
                isArray: true
            }
        });
    }
})();
