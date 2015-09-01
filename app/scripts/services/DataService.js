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
      var deferred = $q.defer();
      if (galleries.length) {
        deferred.resolve(galleries);
      } else {
        fetchGalleries().then(function(d){
          saveGalleries(d.data).then(function(){
            deferred.resolve(galleries);
          });
        });
      }
      return deferred.promise;
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
      var deferred = $q.defer();
      function getG () {
        if (
          galleries[g].photos &&
          galleries[g].photos.length
        ) {
          deferred.resolve(galleries[g].photos);
        } else {
          fetchPhotos(g).then(function(d){
            savePhotos(g,d.data).then(function(){
              deferred.resolve(galleries[g].photos);
            });
          });
        }
      }

      if (galleries.length) {
        getG();
      } else {
        getGalleries().then(function(){
          getG();
        });
      }

      return deferred.promise;
    };

    var getPhoto = function ( g , p ) {
      var deferred = $q.defer();
      if (
        galleries.length &&
        galleries[g].photos.length &&
        galleries[g].photos[p]
      ) {
        deferred.resolve(galleries[g].photos[p]);
      } else {
        getPhotos(g).then(function(){
          deferred.resolve(galleries[g].photos[p]);
        });
      }
      return deferred.promise;
    };

    // public api
    return {
      saveCurrentGallery: saveCurrentGallery,
      getCurrentGallery: getCurrentGallery,

      fetchGalleries: fetchGalleries,
      savehGalleries: saveGalleries,
      getGalleries: getGalleries,
      getGallery: getGallery,

      fetchPhotos: fetchPhotos,
      savePhotos: savePhotos,
      getPhotos: getPhotos,
      getPhoto: getPhoto,

      fetchMainMenu: fetchMainMenu
    };

  });
