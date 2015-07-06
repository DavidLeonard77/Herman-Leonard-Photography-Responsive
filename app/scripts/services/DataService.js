'use strict';

angular.module('hlpApp')
  // use factory for services
  .factory('DataService', function($http,$rootScope,$q) {

    var fetchMainMenu = function () {
      return $http({
          url: 'ajax/menu.json',
          method: 'GET'
        });
    };

    var currentGallery = 0;
    var saveCurrentGallery = function ( c ) {
      currentGallery = c;
    };
    var getCurrentGallery = function () {
      return currentGallery || 0;
    };

    var galleries = [];
    var fetchGalleries = function () {
      return $http({
          url: 'ajax/galleries.json',
          method: 'GET'
        });
    };
    var saveGalleries = function ( data ) {
      var deferred = $q.defer();
      galleries = data;
      deferred.resolve();
      return deferred.promise;
    };
    var getGalleries = function () {
      return galleries;
    };
    var getGallery = function ( g ) {
      return galleries[g];
    };

    var fetchPhotos = function( g ) {

      var l = galleries[g].id + '/' +
              galleries[g].group + '/' +
              galleries[g].all + '/' +
              galleries[g].status + '/' +
              galleries[g].offset + '/' +
              galleries[g].limit;
      console.log('gallery link: ' + l);

      return $http({
          // url: 'ajax/photos/' + l,
          url: 'ajax/photos.json',
          method: 'GET'
        });
    };
    var savePhotos = function ( g, data ) {
      var deferred = $q.defer();
      galleries[g].photos = data;
      deferred.resolve();
      return deferred.promise;
    };
    var getPhotos = function ( g ) {
      return galleries[g].photos;
    };

    // public api
    return {
      saveCurrentGallery: saveCurrentGallery,
      getCurrentGallery: getCurrentGallery,

      fetchGalleries: fetchGalleries,
      saveGalleries: saveGalleries,
      getGalleries: getGalleries,
      getGallery: getGallery,

      fetchPhotos: fetchPhotos,
      savePhotos: savePhotos,
      getPhotos: getPhotos,
      fetchMainMenu: fetchMainMenu
    };

  });
