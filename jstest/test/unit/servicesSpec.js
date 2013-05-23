'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('bookmarksServices'));

  describe("Bookmark", function(){
	  var $httpBackend, BookmarkResource;
	  
	  beforeEach(inject(function(_$httpBackend_, Bookmark){
		  $httpBackend = _$httpBackend_;
		  BookmarkResource = Bookmark;
	  }));
	  
	  afterEach(function() {
		  $httpBackend.verifyNoOutstandingExpectation();
		  $httpBackend.verifyNoOutstandingRequest();
	  });
	  
	  it('should be able to list bookmarks', function(){
		  $httpBackend.expectGET('/rest/bookmarks/list').respond([{
			  name: 'test',
			  url: 'www.test.com',
			  description: 'this is a test'
		  }]);
		  
		  var bookmarks = BookmarkResource.query({});
		  $httpBackend.flush();
		  
		  expect(bookmarks.length).toBe(1);
		  expect(bookmarks[0].name).toBe('test');
		  expect(bookmarks[0].url).toBe('www.test.com');
		  expect(bookmarks[0].description).toBe('this is a test');

	  });
	  
	  it('should be able to create bookmark', function(){
		  var bookmark = {name:'test',url: 'www.test.com',description: 'this is a test'};
		  var bookmarkJson = '{"name":"test","url":"www.test.com","description":"this is a test"}';
		  $httpBackend.expect('PUT', '/rest/bookmarks', bookmarkJson).respond(200);
		  
		  BookmarkResource.create(bookmark);
		  $httpBackend.flush();
	  });
  });
});
