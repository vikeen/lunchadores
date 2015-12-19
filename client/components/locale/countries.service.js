(function () {
    'use strict';

    angular.module('lunchadoresApp').service('countries', CountriesService);

    var COUNTRIES = _getCountries();

    function CountriesService() {
        return {
            getAllCountries: getAllCountries,
            getCountryByAbbreviation: getCountryByAbbreviation
        };

        function getAllCountries() {
            return COUNTRIES;
        }

        function getCountryByAbbreviation(abbreviation) {
            return COUNTRIES[abbreviation];
        }
    }

    /*
     * Private API
     */
    function _getCountries() {
        return {
            'USA': {name: 'United States', abbreviation: 'USA'}
        };
    }
})();
