'use strict';

/* Controllers */

angular.module('bookmarksCtrl', ['bookmarksServices', 'sessionService', 'ui.directives'])

.controller('BookmarksListCtrl', ['$scope', 'Bookmark', 'Session', 'loadingTopic',  function($scope, Bookmark, Session, loadingTopic){
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
		//$rootScope.$broadcast('startLoading');
		loadingTopic.dispatch('startLoading');
		$scope.bookmarks = Bookmark.query({}, function () {
			//$rootScope.$broadcast('finishLoading');
			loadingTopic.dispatch('finishLoading');
		});
	};
		
	//$scope.$on('refresh', load);
	
	$scope.deleteBookmark = function (bookmark) {
		bookmark.$delete({bookmarkId: bookmark.id}, load);
	}
	
	load();

	$scope.hasDescription = function (bookmark) {
		return $.trim(bookmark.description).length > 0;
	}
}])

.controller('BookmarkAddCtrl', ['$scope', 'Bookmark', '$location', function($scope, Bookmark, $location){
	$scope.action = 'Add';
	
	$scope.$on('submit', function (event, bookmark){
		console.log("received" + bookmark);
		
		$scope.$broadcast('saving');
		
		Bookmark.create(bookmark, function() {
			$scope.$broadcast('saved');
			$location.path('/bookmarks');
		});
	});
}])

.controller('BookmarkEditCtrl', ['$scope', 'Bookmark', '$routeParams', '$location', 'loadingTopic', 
                                 function($scope, Bookmark, $routeParams, $location, loadingTopic) {
	$scope.action = 'Edit';
	
	//$rootScope.$broadcast('startLoading');
	loadingTopic.dispatch('startLoading');
	var bookmark = Bookmark.get({bookmarkId: $routeParams.bookmarkId}, function() {
		$scope.name = bookmark.name;
		$scope.url = bookmark.url;
		$scope.description = bookmark.description;
		loadingTopic.dispatch('finishLoading');
		//$rootScope.$broadcast('finishLoading');
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
}])

.controller('BookmarkFormCtrl', ['$scope', function($scope) {
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
}]);