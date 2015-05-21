(function () {
  'use strict';

  angular.module('lunchadoresApp').service('tags', TagService);

  TagService.$inject = ['$resource'];
  function TagService($resource) {
    return $resource('/api/tag', {}, {
      getAllTags: {
        method: 'GET',
        isArray: true
      }
    });
  }
})();
