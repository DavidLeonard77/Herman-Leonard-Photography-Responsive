'use strict';

angular.module('hlpApp')
  .controller('GalleriesCtrl', function (
    $scope, $rootScope, $location, $route, DataService
  ) {

    $scope.go = function (gallery) {
      $location.path('/photos/' + gallery);
    };

    // Get galleries
    DataService.getGalleries().then(function(response){

      // Add photos array to each gallery
      var g = response;
      $scope.galleries = g;
      angular.forEach(g, function(gallery, c){

        g[c].offset = 20;
        g[c].limit = 20;
        g[c].photos = [];

        // Get photos for current gallery view
        DataService.fetchPhotos( c ).then(function( photos ){

          // .. do some stuff with photos data

          // Save photos back to DataService
          DataService.savePhotos( c, photos.data ).then(function(){

            // Now that it's saved let's mirror it in this scope
            DataService.getPhotos( c ).then(function( p ){

              $scope.galleries[ c ].photos = p;

            });

            $rootScope.$broadcast('refresh-photos');

          });

        });

      });


    });


  });
