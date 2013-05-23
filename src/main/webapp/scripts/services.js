'use strict';

/* Services */

angular.module('bookmarksServices', ['ngResource']).
factory('Bookmark', ['$resource', function($resource){
	return $resource('/rest/bookmarks/:bookmarkId', {bookmarkId:'@id'}, {
		query: {method:'GET', params:{bookmarkId:'list'}, isArray:true},
		create: {method: 'PUT', params:{bookmarkId:''}}
	});
}]);

angular.module('sessionService', []).
factory('session', function(){
	var session = {};
	return session;
});
