'use strict';

/**
 * @ngdoc function
 * @name hlpApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the hlpApp
 */
angular.module('hlpApp')
  .controller('MainCtrl', function ($scope) {
    $scope.mainMenu = [
      {
        'title': 'images',
        'url'  : ''
      },{
        'title': 'exhibits',
        'url'  : ''
      },{
        'title': 'news',
        'url'  : ''
      },{
        'title': 'books',
        'url'  : ''
      },{
        'title': 'contact',
        'url'  : ''
      }
    ];
  });
