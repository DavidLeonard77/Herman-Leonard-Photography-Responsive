'use strict';

/**
 * @ngdoc function
 * @name hlpApp.controller:MainCtrl
 * @description
 * # HeaderCtrl
 * Controller of the hlpApp
 */
angular.module('hlpApp')
  .directive('header', function () {
  	return {
      	restrict: 'E',
      	templateUrl: 'directives/header.html',
  		controller: function($scope) {

  		},
  		controllerAs: 'headerCtrl'
  	};
  });
