'use strict';

/* App Module */

angular.module('bookmarks', ['ui.bootstrap', 'bookmarksServices', 'sessionService', 'ui.directives']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/bookmarks', {
    	  templateUrl: '/partials/bookmark-list', 
    	  controller: BookmarksListCtrl
      }).
      when('/bookmarks/add', {
    	  templateUrl: '/partials/bookmark-detail', 
    	  controller: BookmarkAddCtrl
      }).
      when('/bookmarks/edit/:bookmarkId', {
    	  templateUrl: '/partials/bookmark-detail', 
    	  controller: BookmarkEditCtrl
      }).
      when('/about', {
    	  templateUrl: '/partials/about', 
    	  controller: AboutCtrl
      }).
      otherwise({redirectTo: '/bookmarks'});
}]);
