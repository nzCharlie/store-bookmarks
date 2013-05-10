'use strict';

/* Services */

angular.module('bookmarksServices', ['ngResource']).
factory('Bookmark', function($resource){
	return $resource('/rest/bookmarks/:bookmarkId', {}, {
		query: {method:'GET', params:{bookmarkId:'list'}, isArray:true}
	});
});
