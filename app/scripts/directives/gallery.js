'use strict';

angular.module('hlpApp')
  .directive('gallery', function (DataService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/gallery.html',
      scope: {
        photo: '=',
        gallery: '='
      },
      link: function(scope, element, attrs, mainCtrl) {

      }
    };

});
