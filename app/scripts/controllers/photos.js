'use strict';

angular.module('hlpApp')
  .controller('PhotosCtrl', function ($scope, $rootScope, DataService) {

    $scope.gallery = {

      'genre' : 1,
      'group' : 1,
      'viewall' : 20,
      'name' : 20,
      'status' : 'Print',
      'offset' : 20,
      'limit' : 20,

      photos : [],

      getParams : function () {
        return '/' + this.genre + '/' + this.group + '/' + this.viewall + '/' + this.name + '/' + this.status + '/' + this.offset + '/' + this.limit;
      }

    };

    DataService.fetchPhotos().then(function(response){
      DataService.savePhotos(response.data).then(function(){
        $scope.gallery.photos = DataService.getPhotos();
        $rootScope.$broadcast('photos-saved');
      });

    });

  });
