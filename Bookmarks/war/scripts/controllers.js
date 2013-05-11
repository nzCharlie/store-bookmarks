'use strict';

/* Controllers */

function MenuCtrl($scope) {
	$scope.isCollapsed = true;
	$scope.$on('switchNav', function (event, nav) {
		if (nav == 'home') {
			$scope.homeNavActive='active';
			$scope.aboutNavActive='';
		} 
		else if (nav == 'about') {
			$scope.homeNavActive='';
			$scope.aboutNavActive='active';
		}
	});
}

function AboutCtrl($scope, $rootScope) {
	$rootScope.$broadcast('switchNav', 'about');
}

function BookmarksListCtrl($scope, Bookmark, $rootScope, Session) {
	var load = function () {
		console.log('refreshing');
		$scope.bookmarks = Bookmark.query();
	};
		
	$scope.$on('refresh', load);
	
	$scope.deleteBookmark = function (bookmark) {
		bookmark.$delete({bookmarkId: bookmark.id}, load);
	}
	
	load();
	$rootScope.$broadcast('switchNav', 'home');
	
	console.log("sesion sort selection is currently " + Session.sortSelection );
	
	$scope.sortSelection = Session.sortSelection ? Session.sortSelection : 'name';
	$scope.$watch('sortSelection', function() {
		Session.sortSelection = $scope.sortSelection;
		console.log("updating sesion sort selection to " + Session.sortSelection );
	});
	
	console.log("list controller finished.")
}

function BookmarkAddCtrl($scope, Bookmark, $location, $rootScope) {
	$scope.$on('submit', function (event, bookmark){
		console.log("received" + bookmark);
		Bookmark.create(bookmark, function() {
			$rootScope.$broadcast('refresh');
			$location.path('/bookmarks');
		});
	});
}

function BookmarkEditCtrl($scope, Bookmark, $routeParams, $location, $rootScope) {
	var bookmark = Bookmark.get({bookmarkId: $routeParams.bookmarkId}, function() {
		$scope.name = bookmark.name;
		$scope.url = bookmark.url;
		$scope.description = bookmark.description;
	});
	
	$scope.$on('submit', function (event, updatedBookmark){
		console.log("received" + updatedBookmark);
		bookmark.name = updatedBookmark.name;
		bookmark.url = updatedBookmark.url;
		bookmark.description = updatedBookmark.description;
		console.log('updating bookmark id: ' + bookmark.id);
		bookmark.$save({bookmarkId: ''}, function() {
			$rootScope.$broadcast('refresh');
			$location.path('/bookmarks');
		});
	});
	
}

function BookmarkFormCtrl($scope) {
	$scope.submit = function () {
		var bookmark = {
			"name": $scope.name,
			"url": $scope.url,
			"description": $scope.description
		}
		console.log(bookmark);

		$scope.$emit('submit', bookmark);
		console.log("submit" + bookmark);
	};
}