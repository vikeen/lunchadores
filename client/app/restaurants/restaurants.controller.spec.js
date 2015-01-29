'use strict';

describe('Controller: RestaurantsCtrl', function () {

  // load the controller's module
  beforeEach(module('lunchadoresApp'));

  var RestaurantsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    RestaurantsCtrl = $controller('RestaurantsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
