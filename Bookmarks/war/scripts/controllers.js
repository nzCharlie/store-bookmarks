'use strict';

/* Controllers */

function BookmarksListCtrl($scope, Bookmark) {
//  $http.get('/rest/bookmarks/list').success(function(data) {
//	  $scope.bookmarks = data;
//  });
	$scope.bookmarks = Bookmark.query();
}
