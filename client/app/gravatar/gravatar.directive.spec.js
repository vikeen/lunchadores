'use strict';

describe('Directive: gravatar', function () {

  // load the directive's module
  beforeEach(module('lunchadoresApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<gravatar></gravatar>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the gravatar directive');
  }));
});