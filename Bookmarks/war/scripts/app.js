'use strict';

/* App Module */

angular.module('bookmarks', ['ui.bootstrap', 'bookmarksServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/bookmarks', {templateUrl: '/partials/bookmark-list',   controller: BookmarksListCtrl}).
//      when('/bookmarks/:bookmarkId', {templateUrl: '/partials/bookmark-detail',   controller: BookmarksDetailCtrl}).
      otherwise({redirectTo: '/bookmarks'});
}]);
