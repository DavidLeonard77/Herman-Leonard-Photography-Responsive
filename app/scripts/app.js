'use strict';

/**
 * @ngdoc overview
 * @name hlpApp
 * @description
 * # hlpApp
 *
 * Main module of the application.
 */
angular
  .module('hlpApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/photos', {
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
