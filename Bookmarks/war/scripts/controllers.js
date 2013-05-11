'use strict';

/* Controllers */

function AboutCtrl($scope) {
	// do nothing;
}

function BookmarksListCtrl($scope, Bookmark) {
	$scope.bookmarks = Bookmark.query();
}

function MenuCtrl($scope) {
	$scope.isCollapsed = true;
}

function BookmarkAddCtrl($scope, Bookmark) {
	
}