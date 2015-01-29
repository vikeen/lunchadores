'use strict';

describe('Service: maps', function () {

  // load the service's module
  beforeEach(module('lunchadoresApp'));

  // instantiate service
  var maps;
  beforeEach(inject(function (_maps_) {
    maps = _maps_;
  }));

  it('should do something', function () {
    expect(!!maps).toBe(true);
  });

});
