'use strict';

angular.module('hlpApp')
  .controller('PhotosCtrl', function ($scope, $rootScope, DataService) {

    // Get galleries
    DataService.fetchGalleries().then(function(response){

      // Add photos array to each gallery
      var g = response.data;
      for (var i=0; i<g.length; i++) {
        g[i].offset = 20;
        g[i].limit = 20;
        g[i].photos = [];
      }

      // Save galleries back to DataService
      DataService.saveGalleries( g ).then(function(){

        // Now that it's saved let's mirror it in this scope
        var c = DataService.getCurrentGallery();
        $scope.gallery = DataService.getGallery( c );

        // Get photos for current gallery view
        DataService.fetchPhotos( c ).then(function( response ){

            // .. do some stuff with photos data

          // Save photos back to DataService
          DataService.savePhotos( c, response.data ).then(function(){

            // Now that it's saved let's mirror it in this scope
            $scope.gallery.photos = DataService.getPhotos( c );
            $rootScope.$broadcast('refresh-photos');

          });

        });

      });
    });


  });
