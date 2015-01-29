'use strict';

describe('Directive: letsEat', function () {

  // load the directive's module and view
  beforeEach(module('lunchadoresApp'));
  beforeEach(module('app/lets-eat/lets-eat.html'));

  var element, scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<lets-eat></lets-eat>');
    element = $compile(element)(scope);
    scope.$apply();
    expect(element.text()).toBe('this is the letsEat directive');
  }));
});