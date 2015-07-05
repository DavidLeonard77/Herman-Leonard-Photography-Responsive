'use strict';

angular.module('hlpApp')
  .directive('drawer', function ($rootScope, DataService) {
    return {
      restrict: 'E',
      templateUrl: 'directives/drawer.html',
      scope: {
        view: '=',
        menu: '=',
        gallery: '=',
        search: '=',
        photos: '@'
      },
      link: function(scope, element) {

        DataService.fetchMainMenu().then(function(response){
          scope.menu = response.data;
        });
        $rootScope.$on('photos-saved', function(event){
          scope.photos = DataService.getPhotos();
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
