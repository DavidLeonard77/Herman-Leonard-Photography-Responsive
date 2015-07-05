'use strict';

angular.module('hlpApp')
  .directive('dl', function ($rootScope, DataService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/dl-menu.html',
      scope: {

      },
      link: function(scope, element) {

      }
    };
  });
