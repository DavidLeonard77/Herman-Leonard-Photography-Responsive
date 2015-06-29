'use strict';

angular.module('hlpApp')
  .directive('thumbnail', function (DataService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/thumbnail.html',
      scope: {
        photo: '='
      },
      link: function(scope, element, attrs, mainCtrl) {

      }
    };

});
