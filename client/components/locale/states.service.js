(function () {
  'use strict';

  angular.module('lunchadoresApp').service('states', StatesService);

  var STATES = _getStates();

  function StatesService() {
    return {
      getAllStates: getAllStates,
      getStateByAbbreviation: getStateByAbbreviation
    };

    function getAllStates() {
      return STATES;
    }

    function getStateByAbbreviation(abbreviation) {
      return STATES[abbreviation];
    }
  }

  /*
   * Private API
   */
  function _getStates() {
    return {
      'AL': { name: 'Alabama', abbreviation: 'AL' },
      'AK': { name: 'Alaska', abbreviation: 'AK' },
      'AS': { name: 'American Samoa', abbreviation: 'AS' },
      'AZ': { name: 'Arizona', abbreviation: 'AZ' },
      'AR': { name: 'Arkansas', abbreviation: 'AR' },
      'CA': { name: 'California', abbreviation: 'CA' },
      'CO': { name: 'Colorado', abbreviation: 'CO' },
      'CT': { name: 'Connecticut', abbreviation: 'CT' },
      'DE': { name: 'Delaware', abbreviation: 'DE' },
      'DC': { name: 'District Of Columbia', abbreviation: 'DC' },
      'FM': { name: 'Federated States Of Micronesia', abbreviation: 'FM' },
      'FL': { name: 'Florida', abbreviation: 'FL' },
      'GA': { name: 'Georgia', abbreviation: 'GA' },
      'GU': { name: 'Guam', abbreviation: 'GU' },
      'HI': { name: 'Hawaii', abbreviation: 'HI' },
      'ID': { name: 'Idaho', abbreviation: 'ID' },
      'IL': { name: 'Illinois', abbreviation: 'IL' },
      'IN': { name: 'Indiana', abbreviation: 'IN' },
      'IA': { name: 'Iowa', abbreviation: 'IA' },
      'KS': { name: 'Kansas', abbreviation: 'KS' },
      'KY': { name: 'Kentucky', abbreviation: 'KY' },
      'LA': { name: 'Louisiana', abbreviation: 'LA' },
      'ME': { name: 'Maine', abbreviation: 'ME' },
      'MH': { name: 'Marshall Islands', abbreviation: 'MH' },
      'MD': { name: 'Maryland', abbreviation: 'MD' },
      'MA': { name: 'Massachusetts', abbreviation: 'MA' },
      'MI': { name: 'Michigan', abbreviation: 'MI' },
      'MN': { name: 'Minnesota', abbreviation: 'MN' },
      'MS': { name: 'Mississippi', abbreviation: 'MS' },
      'MO': { name: 'Missouri', abbreviation: 'MO' },
      'MT': { name: 'Montana', abbreviation: 'MT' },
      'NE': { name: 'Nebraska', abbreviation: 'NE' },
      'NV': { name: 'Nevada', abbreviation: 'NV' },
      'NH': { name: 'New Hampshire', abbreviation: 'NH' },
      'NJ': { name: 'New Jersey', abbreviation: 'NJ' },
      'NM': { name: 'New Mexico', abbreviation: 'NM' },
      'NY': { name: 'New York', abbreviation: 'NY' },
      'NC': { name: 'North Carolina', abbreviation: 'NC' },
      'ND': { name: 'North Dakota', abbreviation: 'ND' },
      'MP': { name: 'Northern Mariana Islands', abbreviation: 'MP' },
      'OH': { name: 'Ohio', abbreviation: 'OH' },
      'OK': { name: 'Oklahoma', abbreviation: 'OK' },
      'OR': { name: 'Oregon', abbreviation: 'OR' },
      'PW': { name: 'Palau', abbreviation: 'PW' },
      'PA': { name: 'Pennsylvania', abbreviation: 'PA' },
      'PR': { name: 'Puerto Rico', abbreviation: 'PR' },
      'RI': { name: 'Rhode Island', abbreviation: 'RI' },
      'SC': { name: 'South Carolina', abbreviation: 'SC' },
      'SD': { name: 'South Dakota', abbreviation: 'SD' },
      'TN': { name: 'Tennessee', abbreviation: 'TN' },
      'TX': { name: 'Texas', abbreviation: 'TX' },
      'UT': { name: 'Utah', abbreviation: 'UT' },
      'VT': { name: 'Vermont', abbreviation: 'VT' },
      'VI': { name: 'Virgin Islands', abbreviation: 'VI' },
      'VA': { name: 'Virginia', abbreviation: 'VA' },
      'WA': { name: 'Washington', abbreviation: 'WA' },
      'WV': { name: 'West Virginia', abbreviation: 'WV' },
      'WI': { name: 'Wisconsin', abbreviation: 'WI' },
      'WY': { name: 'Wyoming', abbreviation: 'WY' }
    };
  }
})();
