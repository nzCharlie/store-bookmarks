'use strict';

/* App Module */

function getBookmarkId($route){
  return $route.current.params.bookmarkId;
}
getBookmarkId.$inject = ['$route'];

angular.module('bookmarks', 
    ['bookmarksCtrl', 'ui.bootstrap', 'bookmarksServices', 'sessionService', 'ui.directives', 'loader.directives', 'messaging', 'markdown.directives', 'modalWindowDecisionService', 'SecurityService'])

.config(['$routeProvider', 'showModalWindowProvider', function($routeProvider, showModalWindowProvider) {
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
	  controller: 'BookmarkEditCtrl',
	  resolve: {
	    'bookmarkId': getBookmarkId
	  }
  }).
  when('/about', {
	  templateUrl: '/partials/about'
  }).
  otherwise({redirectTo: '/bookmarks'});
  
  showModalWindowProvider.setMaxModalWidth(767);
}])

.run(['Bookmark', 'loadingTopic', 'showModalWindow', function (Bookmark, loadingTopic, showModalWindow) {
  Bookmark.addStartListener(function (service) {
    if (service == 'query' || service == 'delete' || service == 'remove' || (!showModalWindow() && service == 'get')) {
      loadingTopic.dispatch('startLoading');
    }
  });
  Bookmark.addFinishListener(function (service) {
    if (service == 'query' || service == 'delete' || service == 'remove' || (!showModalWindow() && service == 'get')) {
      loadingTopic.dispatch('finishLoading');
    }
  });
}]);
