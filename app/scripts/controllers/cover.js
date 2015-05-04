'use strict';

/**
 * @ngdoc function
 * @name hlpApp.controller:MainCtrl
 * @description
 * # CoverCtrl
 * Controller of the hlpApp
 */
angular.module('hlpApp')
  .controller('CoverCtrl', function ($scope) {

    $scope.go = function (url) {
    	document.location = url;
    };

    var w = $(window).width(),
        h = $(window).height()-100;
    $('.cover > .cover-spacer > div').height(w).height(h);
    $(window).resize(function(){
      w = $(window).width();
      h = $(window).height()-100;
      $('.cover > .cover-spacer > div').width(w).height(h);
    });

  });
