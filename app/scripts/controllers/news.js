'use strict';

angular.module('hlpApp')
  .controller('NewsCtrl', function ($scope) {

    function wall (details) {

      this.page = details.page;
      this.col = details.col;
      this.element = details.element;
      this.pageCount = details.pageCount;
      this.totalEntries = details.totalEntries;
      this.pageIncrement = details.pageIncrement;
    }

    // For each coloumn get the total height and save it to the coloumn object
    wall.prototype.getHeights = function (success) {

      for (var key in news.col) {

        news.col[key].height = document.getElementById(key).offsetHeight;

      }

      success();
    }

    // Go through coloumns and return the shortest
    wall.prototype.getShortCol = function (success) {

      //  Get the total heights for each coloumn first
      this.getHeights(function(){

        var shortColId = undefined;
        var shortColHeight = 0;

        // For each coloumn check if it's the shortest
        for (var key in news.col) {

          if ((shortColId == undefined) || (news.col[key].height < shortColHeight)) {

            shortColId = key;
            shortColHeight = news.col[key].height;
          }

        }

        var shortCol = {

          id: shortColId,
          height: shortColHeight

        }

        // Return the shortest coloumn object (id and height)
        success(shortCol);

      });
    }

    //HTML
    wall.prototype.bulletin = function (title,img,txt,link) {

      var content = '<div class="title">' + title + '</div>';
      if (txt != '') content += '<div class="short">' + txt + '</div>';
      if (img != '') content += '<div class="image"><img src="' + img + '"></div>';


      var container = '<div class="bulletin"><div>' + content + '</div></div>';

      return container;
    }

    // Inject each element into next shortest coloumn
    wall.prototype.postArticles = function () {

      // Cycle through each element
      for (var key in news.element) {

        // Find next shortest col and append html
        news.getShortCol(function(shortest){

          var html = news.element[key].content;
          $('#' + shortest.id).append(html);

        });

      }
    }

    $scope.news = new wall({

      page: {

        sticky: {

          title: undefined,
          images: undefined,
          link: undefined,
          text: undefined,
          height: 0

        }

      },

      col: {},
      articles: {},
      element: {},

      pageCount: 0,
      totalEntries: 0,
      pageIncrement: 27
    });

    $.get('ajax/news.json', function (data) {

      $scope.news.articles = data;
      $scope.$apply();

      $scope.$on('postCoverNewsDirective', function(scope, element, attrs){

        // Post Angular ng-repeat bootstrap classes
        $('.news > div:nth-child(1)').addClass('col-xs-12 col-sm-6 col-md-4');
        $('.news > div:nth-child(2)').addClass('col-sm-6 col-md-4 hidden-xs');
        $('.news > div:nth-child(3)').addClass('col-sm-4 hidden-xs hidden-sm');

      });
    });

  })
  .directive('postCoverNewsDirective',function(){
    return function(scope, element, attrs) {
      if (scope.$last) setTimeout(function(){ scope.$emit('postCoverNewsDirective', element, attrs) }, 1);
    };
  });
