'use strict';

/* App Module */

angular.module('bookmarks', ['ui.bootstrap', 'bookmarksServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/bookmarks', {
    	  templateUrl: '/partials/bookmark-list', 
    	  controller: BookmarksListCtrl,
    	  reloadOnSearch: true
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
