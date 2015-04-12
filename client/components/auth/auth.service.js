(function() {
  /* jshint camelcase:false */

  'use strict';

  angular.module('lunchadoresApp').factory('Auth', AuthFactory);

  function AuthFactory($location, $rootScope, $http, User, $cookieStore, $q) {
    var currentUser = {};

    activate();

    return {
      createUser: createUser,
      changePassword: changePassword,
      getCurrentUser: getCurrentUser,
      getToken: getToken,
      login: login,
      logout: logout
    };

    function activate() {
      if ($cookieStore.get('token')) {
        currentUser = User.get();
      }

      /**
       * Check if a user is an admin
       *
       * @return {Boolean}
       */
      $rootScope.isAdmin = function () {
        return currentUser.role === 'admin';
      };

      /**
       * Check if a user is logged in
       *
       * @return {Boolean}
       */
      $rootScope.isLoggedIn = function () {
        return currentUser.hasOwnProperty('role');
      };

      /**
       * Waits for currentUser to resolve before checking if user is logged in
       */
      $rootScope.isLoggedInAsync = function (cb) {
        if (currentUser.hasOwnProperty('$promise')) {
          currentUser.$promise.then(function () {
            cb(true);
          }).catch(function () {
            cb(false);
          });
        } else if (currentUser.hasOwnProperty('role')) {
          cb(true);
        } else {
          cb(false);
        }
      };
    }

    /**
     * Change password
     *
     * @param  {String}   oldPassword
     * @param  {String}   newPassword
     * @param  {Function} callback    - optional
     * @return {Promise}
     */
    function changePassword(oldPassword, newPassword, callback) {
      var cb = callback || angular.noop;

      return User.changePassword({id: currentUser.id}, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, function (user) {
        return cb(user);
      }, function (err) {
        return cb(err);
      }).$promise;
    }

    /**
     * Gets all available info on authenticated user
     *
     * @return {Object} user
     */
    function getCurrentUser() {
      return currentUser;
    }

    /**
     * Get auth token
     */
    function getToken() {
      return $cookieStore.get('token');
    }

    /**
     * Authenticate user and save token
     *
     * @param  {Object}   user     - login info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function login(user, callback) {
      var cb = callback || angular.noop;
      var deferred = $q.defer();

      $http.post('/auth/local', {
        email_address: user.email_address,
        password: user.password
      })
        .success(function (data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          deferred.resolve(data);
          return cb();
        })
        .error(function (err) {
          logout();
          deferred.reject(err);
          return cb(err);
        });

      return deferred.promise;
    }

    /**
     * Delete access token and user info
     *
     */
    function logout() {
      $cookieStore.remove('token');
      currentUser = {};
    }

    /**
     * Create a new user
     *
     * @param  {Object}   user     - user info
     * @param  {Function} callback - optional
     * @return {Promise}
     */
    function createUser(user, callback) {
      var cb = callback || angular.noop;

      return User.save(user,
        function (data) {
          $cookieStore.put('token', data.token);
          currentUser = User.get();
          return cb(user);
        },
        function (err) {
          logout();
          return cb(err);
        }).$promise;
    }
  }
})();
