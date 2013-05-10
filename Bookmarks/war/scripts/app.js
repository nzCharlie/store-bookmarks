'use strict';

/* App Module */

angular.module('bookmarks', ['bookmarksServices']).
  config(['$routeProvider', function($routeProvider) {
  $routeProvider.
      when('/bookmarks', {templateUrl: '/partials/bookmark-list',   controller: BookmarksListCtrl}).
      otherwise({redirectTo: '/bookmarks'});
}]);
