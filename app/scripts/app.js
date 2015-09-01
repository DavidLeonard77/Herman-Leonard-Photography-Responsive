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
    'ngResource',
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/home.html'
      })
      .when('/photos/', {
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl'
      })
      .when('/photos/:gallery', {
        templateUrl: 'views/photos.html',
        controller: 'PhotosCtrl'
      })
      .when('/galleries', {
        templateUrl: 'views/galleries.html',
        controller: 'GalleriesCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
