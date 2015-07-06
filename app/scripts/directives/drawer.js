'use strict';

angular.module('hlpApp')
  .directive('drawer', function ($rootScope, DataService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/drawer.html',
      scope: {

        menu: '=',
        galleries: '@',
        currentGallery: '@',
        search: '='
        
      },
      link: function(scope, element) {

        DataService.fetchMainMenu().then(function(response){
          scope.menu = response.data;
        });

        $rootScope.$on('refresh-photos', function(){
          scope.currentGallery = DataService.getCurrentGallery();
          scope.galleries = DataService.getGalleries();
        });

        //console.log(scope.gallery.photos);
        scope.drawer = false;
        scope.toggleDrawer = function () {
          scope.drawer = !scope.drawer;
          if (scope.drawer) {
            element.addClass('active');
          } else {
            element.removeClass('active');
          }
        };

      }
    };
  });
