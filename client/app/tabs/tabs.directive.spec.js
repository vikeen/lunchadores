'use strict';

describe('Directive: tabs', function () {

  // load the directive's module
  beforeEach(module('lunchadoresApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<tabs></tabs>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the tabs directive');
  }));
});