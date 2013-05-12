'use strict';

/* Controllers */

function MenuCtrl($scope, $location) {
	$scope.isCollapsed = true;
	
	var navActive = function (nav) {
		if (nav == 'about') {
			$scope.homeNavActive='';
			$scope.aboutNavActive='active';
		} 
		else {
			$scope.homeNavActive='active';
			$scope.aboutNavActive='';
		}
	}
	
	console.log($location.path());
	navActive($location.path() == '/about' ? 'about' : '');
	
	$scope.$on('switchNav', function (event, nav) {
		navActive(nav);
	});
}

function LoadingCtrl($scope) {
	$scope.isLoading = true;
	$scope.$on('startLoading', function(event) {
		console.log('start loading');
		$scope.isLoading = true;
	});
	$scope.$on('finishLoading', function(event) {
		console.log('finish loading');
		$scope.isLoading = false;
	});
}

function AboutCtrl($scope, $rootScope) {
	$rootScope.$broadcast('switchNav', 'about');
}

function BookmarksListCtrl($scope, Bookmark, $rootScope, Session) {
	$scope.isAscendingSort = angular.isUndefined(Session.isAscendingSort) ? true : Session.isAscendingSort;
	$scope.sortSelection = angular.isUndefined(Session.sortSelection) ? 'name' : Session.sortSelection;

	var updateSortOrder = function () {
		Session.sortSelection = $scope.sortSelection;
		Session.isAscendingSort = $scope.isAscendingSort;
		
		var sortPrefix = !$scope.isAscendingSort ? '-' : '';
		$scope.sortDirectionIconClass = !$scope.isAscendingSort ? 'icon-arrow-down' : 'icon-arrow-up';
		$scope.sort = sortPrefix + $scope.sortSelection;
	}
	$scope.$watch('sortSelection', updateSortOrder);
	$scope.$watch('isAscendingSort', updateSortOrder);
	updateSortOrder();
	
	var load = function () {
		console.log('refreshing');
		$rootScope.$broadcast('startLoading');
		$scope.bookmarks = Bookmark.query({}, function () {
			$rootScope.$broadcast('finishLoading');
		});
	};
		
	//$scope.$on('refresh', load);
	
	$scope.deleteBookmark = function (bookmark) {
		bookmark.$delete({bookmarkId: bookmark.id}, load);
	}
	
	load();
	$rootScope.$broadcast('switchNav', 'home');	

	$scope.hasDescription = function (bookmark) {
		return $.trim(bookmark.description).length > 0;
	}
	
	console.log("list controller finished.")
}

function BookmarkAddCtrl($scope, Bookmark, $location, $rootScope) {
	$scope.action = 'Add';
	
	$scope.$on('submit', function (event, bookmark){
		console.log("received" + bookmark);
		
		$scope.$broadcast('saving');
		
		Bookmark.create(bookmark, function() {
			$scope.$broadcast('saved');
			$location.path('/bookmarks');
		});
	});
}

function BookmarkEditCtrl($scope, Bookmark, $routeParams, $location, $rootScope) {
	$scope.action = 'Edit';
	
	$rootScope.$broadcast('startLoading');
	var bookmark = Bookmark.get({bookmarkId: $routeParams.bookmarkId}, function() {
		$scope.name = bookmark.name;
		$scope.url = bookmark.url;
		$scope.description = bookmark.description;
		
		$rootScope.$broadcast('finishLoading');
	});
	
	$scope.$on('submit', function (event, updatedBookmark){
		console.log("received" + updatedBookmark);
		
		$scope.$broadcast('saving');
		
		bookmark.name = updatedBookmark.name;
		bookmark.url = updatedBookmark.url;
		bookmark.description = updatedBookmark.description;
	
		console.log('updating bookmark id: ' + bookmark.id);
		bookmark.$save({bookmarkId: ''}, function() {
			$scope.$broadcast('saved');
			$location.path('/bookmarks');
		});
	});
	
}

function BookmarkFormCtrl($scope) {
	$scope.isSaving = false;
	
	$scope.submit = function () {
		var bookmark = {
			"name": $.trim($scope.name),
			"url": $scope.url,
			"description": $.trim($scope.description)
		}
		console.log(bookmark);

		$scope.$emit('submit', bookmark);
		console.log("submit" + bookmark);
	};
	
	$scope.$on('saving', function() {
		$scope.isSaving = true;
	});
	$scope.$on('saved', function() {
		$scope.isSaving = false;
	});
}