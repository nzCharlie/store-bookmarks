'use strict';

/* App Module */

angular.module('bookmarks', ['ui.bootstrap', 'bookmarksServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/bookmarks', {templateUrl: '/partials/bookmark-list',   controller: BookmarksListCtrl}).
      when('/bookmarks/add', {templateUrl: '/partials/bookmark-detail',   controller: BookmarkAddCtrl}).
      when('/about', {templateUrl: '/partials/about',   controller: AboutCtrl}).
      otherwise({redirectTo: '/bookmarks'});
}]);
