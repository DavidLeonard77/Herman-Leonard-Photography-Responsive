'use strict';

/**
 * @ngdoc function
 * @name hlpApp.controller:MainCtrl
 * @description
 * # NewsCtrl
 * Controller of the hlpApp
 */
angular.module('hlpApp')
  .controller('ThumbnailCtrl', function ($scope) {

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

 // $.get('ajax/thumnails.json' + $scope.gallery.getParams(), function (data) {
    $.get('ajax/thumbnails.json', function (data) {

      $scope.gallery.photos = data;
      $scope.$apply();

      console.log($scope.gallery);

      // Add some stuff to the image data
      // for (var c=0; c<$scope.gallery.photos.length; c++) {
      //   $scope.gallery.photos[c].thumbHover = true;
      // }

      // $scope.$on('postGalleryThumbnailsDirective', function(scope, element, attrs){

      //   // Post Angular ng-repeat bootstrap classes
      //   $('.news > div:nth-child(1)').addClass('col-xs-12 col-sm-6 col-md-4');
      //   $('.news > div:nth-child(2)').addClass('col-sm-6 col-md-4 hidden-xs');
      //   $('.news > div:nth-child(3)').addClass('col-sm-4 hidden-xs hidden-sm');

      // });
    });

});
