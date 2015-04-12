(function() {
  'use strict';

  angular.module('lunchadoresApp', [
    'ngCookies',
    'ngMd5',
    'ngResource',
    'ngSanitize',
    'ui.router'
  ])
    .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
      $urlRouterProvider
        .otherwise('/');

      $locationProvider.html5Mode(true);
      $httpProvider.interceptors.push('authInterceptor');
    })

    .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
      return {
        // Add authorization token to headers
        request: function (config) {
          config.headers = config.headers || {};
          if ($cookieStore.get('token')) {
            config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
          }
          return config;
        },

        // Intercept 401s and redirect you to login
        responseError: function (response) {
          if (response.status === 401) {
            $location.path('/login');
            // remove any stale tokens
            $cookieStore.remove('token');
            return $q.reject(response);
          }
          else {
            return $q.reject(response);
          }
        }
      };
    })

    .run(function ($rootScope, $location, notifications) {
      // Redirect to login if route requires auth and you're not logged in
      $rootScope.$on('$stateChangeStart', function (event, next) {
        $rootScope.isLoggedInAsync(function (loggedIn) {
          if (loggedIn) {
            $rootScope.$broadcast('userLoginSuccess');
          } else if (next.authenticate && !loggedIn) {
            $location.path('/login');
          }
        });
      });

      /*
       * Handle User Geolocation Acceptance
       *
       */
      $(function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            $rootScope.$apply(function () {
              $rootScope.position = position;
            });
          }, function () {
            notifications.showError({
              id: 'denied-geolocation',
              saveResponse: true,
              message: 'You have disabled geolocation. This will prevent us from using your location to improve your experience.'
            });
          });
        } else {
          notifications.showError({
            id: 'unsupported-geolocation',
            saveResponse: true,
            message: 'Your device does not support geolocation. This will prevent us from using your location to improve your experience.'
          });
        }
      });
    });
})();
