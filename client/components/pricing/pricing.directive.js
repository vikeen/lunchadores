(function() {
  'use strict';

  angular.module('lunchadoresApp').directive('lunchadoresPricing', PricingDirective);

  function PricingDirective() {
    return {
      restrict: 'E',
      scope: {
        pricingValue: '='
      },
      templateUrl: 'components/pricing/pricing.html',
      link: function () {}
    };
  }
})();
