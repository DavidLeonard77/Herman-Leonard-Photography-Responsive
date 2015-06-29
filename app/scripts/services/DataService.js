'use strict';

angular.module('hlpApp')
  // use factory for services
  .factory('DataService', function($http,$rootScope,$q) {

    var fetchPhotos = function() {
      return $http({
          url: 'ajax/thumbnails.json',
          method: 'GET'
        });
    };

    var fetchMenu = function () {
      return $http({
          url: 'ajax/menu.json',
          method: 'GET'
        });
    };

    var photos = {};
    var savePhotos = function (data) {
      var deferred = $q.defer();
      photos = data;
      deferred.resolve();
      return deferred.promise;
    };
    var getPhotos = function () {
      return photos;
    };


    // public api
    return {
      fetchPhotos: fetchPhotos,
      savePhotos: savePhotos,
      getPhotos: getPhotos,
      fetchMenu: fetchMenu
    };

  });
