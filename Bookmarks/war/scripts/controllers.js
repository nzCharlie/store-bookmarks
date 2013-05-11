'use strict';

/* Controllers */

function BookmarksListCtrl($scope, Bookmark) {
	$scope.bookmarks = Bookmark.query();
}

function CollapseCtrl($scope) {
	$scope.isCollapsed = true;
}