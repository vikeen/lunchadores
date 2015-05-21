(function () {
  /* jshint camelcase:false */

  'use strict';

  angular.module('lunchadoresApp').controller('RestaurantCtrl', RestaurantCtrl);

  function RestaurantCtrl($rootScope, $stateParams, $q, restaurants, notifications, tags, states, countries) {
    var self = this;

    self.countries = {};
    self.countrySearch = {};
    self.errors = [];
    self.updateRestaurantFormSubmit = false;
    self.restaurant = {};
    self.states = {};
    self.stateSearchText = '';
    self.tagSearchText = '';

    self.canUpdate = canUpdate;
    self.getGeoCoordinates = getGeoCoordinates;
    self.tagQuerySearch = tagQuerySearch;
    self.updateRestaurant = updateRestaurant;

    activate();

    ////////////

    function activate() {
      restaurants.get({id: $stateParams.id}).$promise.then(function (response) {
        self.restaurant = response;
      });

      self.states = states.getAllStates();
      self.countries = countries.getAllCountries();
      self.tags = self.tags = tags.getAllTags();
    }

    function canUpdate() {
      return $rootScope.isAdmin();
    }

    function getGeoCoordinates() {
      var deferred = $q.defer();

      var address = [
        self.restaurant.street,
        self.restaurant.city,
        self.restaurant.state_abbreviation + ' ' + self.restaurant.zipcode,
        self.restaurant.country_abbreviation
      ].join(',');

      new google.maps.Geocoder().geocode({address: address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          if (results.length === 0) {
            self.errors.push({message: 'No Results Found.'});
            deferred.reject();
          } else if (results.length === 1) {
            self.restaurant.formatted_address = results[0].formatted_address;
            self.restaurant.lat = results[0].geometry.location.lat();
            self.restaurant.lng = results[0].geometry.location.lng();

            deferred.resolve();
          } else {
            self.errors.push({message: 'Too many results found. Please refine your search parameters.'});
            deferred.reject();
          }
        } else {
          self.errors.push({message: 'Unknown Error Encountered.'});
          deferred.reject();
        }
      });

      return deferred.promise;
    }

    function tagQuerySearch(query) {
      var filteredTags = self.tags.filter(_createFilterFor(query));
      return filteredTags.length ? filteredTags : self.tags;
    }

    function updateRestaurant() {
      self.errors = [];
      self.updateRestaurantFormSubmit = true;

      self.getGeoCoordinates().then(function () {
        restaurants.update({id: self.restaurant.id}, self.restaurant).$promise
          .then(function () {
            notifications.showSuccess({
              message: 'Updated "' + self.restaurant.name + '".',
              hide: true
            });
          }).catch(function () {
            notifications.showError({
              message: 'Failed to update: "' + self.restaurant.name + '".',
              hide: true
            });
          })
          .finally(function () {
            self.updateRestaurantFormSubmit = false;
          });
      });
    }

    /*
     * Private API
     */

    function _createFilterFor(query) {
      var lowercaseQuery = angular.lowercase(query);
      return function filterFn(tag) {
        return (tag.readable_name.toLowerCase().indexOf(lowercaseQuery) === 0);
      };
    }
  }
})();
