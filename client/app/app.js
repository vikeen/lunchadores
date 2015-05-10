(function() {
  'use strict';

  angular.module('lunchadoresApp', [
    'ngCookies',
    'ngMd5',
    'ngMaterial',
    'ngResource',
    'ngSanitize',
    'ui.router'
  ])
  .config(ApplicationConfig)
  .factory('authInterceptor', AuthInterceptorFactory)
  .run(ApplicationRun);

  function ApplicationConfig($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider.otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  }

  function AuthInterceptorFactory($q, $cookieStore, $location) {
    return {
      request: request,
      responseError: responseError
    };

    // Add authorization token to headers
    function request(config) {
      config.headers = config.headers || {};
      if ($cookieStore.get('token')) {
        config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
      }
      return config;
    }

    // Intercept 401s and redirect you to login
    function responseError(response) {
      if (response.status === 401) {
        $location.path('/login');
        // remove any stale tokens
        $cookieStore.remove('token');
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    }
  }

  function ApplicationRun($rootScope, $location, $q, notifications) {
    initGeolocation();
    initLoginRedirect();

    // Redirect to login if route requires auth and you're not logged in
    function initLoginRedirect() {
      $rootScope.$on('$stateChangeStart', function (event, next) {
        $rootScope.isLoggedInAsync(function (loggedIn) {
          if (loggedIn) {
            $rootScope.$broadcast('userLoginSuccess');
          }

          if (next.admin) {
            if (!$rootScope.isAdmin()) {
              $location.path('/');
            }
          } else if (next.authenticate && !loggedIn) {
            $location.path('/login');
          }
        });
      });
    }

    function initGeolocation() {
      var geolocationPromise = $q.defer();
      $rootScope.geolocationPromise = geolocationPromise.promise;

      $(function () {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function (position) {
            geolocationPromise.resolve(position);
          }, function () {
            geolocationPromise.reject('denied');
            notifications.showError({
              id: 'denied-geolocation',
              saveResponse: true,
              message: 'You have disabled geolocation. This will prevent us from using your location to improve your experience.'
            });
          });
        } else {
          geolocationPromise.reject('unsupported');
          notifications.showError({
            id: 'unsupported-geolocation',
            saveResponse: true,
            message: 'Your device does not support geolocation. This will prevent us from using your location to improve your experience.'
          });
        }
      });
    }
  }
})();
