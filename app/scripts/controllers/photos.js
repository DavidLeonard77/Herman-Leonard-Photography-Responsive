'use strict';

angular.module('hlpApp')
  .controller('PhotosCtrl', function (
    $scope, $rootScope, $route, DataService
  ) {

    console.log($route.current.params);

    // Get galleries
    DataService.getGalleries().then(function(response){

      // Add photos array to each gallery
      var g = response;
      angular.forEach(g, function(gallery,i){
        g[i].offset = 20;
        g[i].limit = 20;
        g[i].photos = [];
      });

      if ($route.current.params.gallery){
        DataService.saveCurrentGallery($route.current.params.gallery);
      }
      var c = DataService.getCurrentGallery();

      // Get photos for current gallery view
      DataService.getPhotos( c ).then(function( photos ){

        // .. do some stuff with photos data

        // Save photos back to DataService
        DataService.savePhotos( c, photos ).then(function(){

          // Now that it's saved let's mirror it in this scope
          DataService.getPhotos( c ).then(function( p ){
            $scope.gallery.photos = p;
            $rootScope.$broadcast('refresh-photos');
          });

        });

      });

    });


  });
