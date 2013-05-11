'use strict';

/* Services */

angular.module('bookmarksServices', ['ngResource']).
factory('Bookmark', function($resource){
	return $resource('/rest/bookmarks/:bookmarkId', {bookmarkId:'@id'}, {
		query: {method:'GET', params:{bookmarkId:'list'}, isArray:true},
		create: {method: 'PUT', params:{bookmarkId:''}}
	});
});
