'use strict';

/* App Module */

angular.module('bookmarks', 
    ['bookmarksCtrl', 'ui.bootstrap', 'bookmarksServices', 'sessionService', 'ui.directives', 'loader.directives', 'messaging'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.
  when('/bookmarks', {
	  templateUrl: '/partials/bookmark-list', 
	  controller: 'BookmarksListCtrl'
  }).
  when('/bookmarks/add', {
	  templateUrl: '/partials/bookmark-detail', 
	  controller: 'BookmarkAddCtrl'
  }).
  when('/bookmarks/edit/:bookmarkId', {
	  templateUrl: '/partials/bookmark-detail', 
	  controller: 'BookmarkEditCtrl'
  }).
  when('/about', {
	  templateUrl: '/partials/about'
  }).
  otherwise({redirectTo: '/bookmarks'});
}])

.run(['Bookmark', 'loadingTopic', function (Bookmark, loadingTopic) {
  Bookmark.addStartListener(function () {
    loadingTopic.dispatch('startLoading');
  });
  Bookmark.addFinishListener(function () {
    loadingTopic.dispatch('finishLoading');
  });
}]);
