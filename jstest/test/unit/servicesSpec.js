'use strict';

/* jasmine specs for services go here */

describe('service', function() {
  beforeEach(module('bookmarksServices'));

  describe("Bookmark", function() {
    var $httpBackend, BookmarkResource, bookmark;

    beforeEach(inject(function(_$httpBackend_, Bookmark) {
      $httpBackend = _$httpBackend_;
      BookmarkResource = Bookmark;

      bookmark = {
        id : 1,
        name : 'test',
        url : 'www.test.com',
        description : 'this is a test'
      };
    }));

    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });

    it('should be able to list bookmarks', function() {
      $httpBackend.expectGET('/rest/bookmarks/list').respond([ bookmark ]);

      var bookmarks = BookmarkResource.query({});
      $httpBackend.flush();

      expect(bookmarks.length).toBe(1);
      expect(bookmarks[0].id).toBe(1);
      expect(bookmarks[0].name).toBe('test');
      expect(bookmarks[0].url).toBe('www.test.com');
      expect(bookmarks[0].description).toBe('this is a test');

    });

    it('should be able to create bookmark', function() {
      $httpBackend.expect('PUT', '/rest/bookmarks', angular.toJson(bookmark)).respond(204);

      BookmarkResource.create(bookmark);
      $httpBackend.flush();
    });

    it('should be able to get bookmark', function() {
      $httpBackend.expect('GET', '/rest/bookmarks/1').respond(bookmark);

      var actual = BookmarkResource.get({
        bookmarkId : bookmark.id
      });
      $httpBackend.flush();

      expect(actual.id).toBe(1);
      expect(actual.name).toBe('test');
      expect(actual.url).toBe('www.test.com');
      expect(actual.description).toBe('this is a test');
    });

    it('should be able to delete bookmark', function() {
      $httpBackend.expect('GET', '/rest/bookmarks/1').respond(bookmark);

      var aBookmark = BookmarkResource.get({
        bookmarkId : 1
      });
      $httpBackend.flush();

      $httpBackend.expect('DELETE', '/rest/bookmarks/1').respond(204);
      aBookmark.$delete({
        bookmarkId : aBookmark.id
      });
      $httpBackend.flush();
    });

    it('should be able to save bookmark', function() {
      $httpBackend.expect('GET', '/rest/bookmarks/1').respond(bookmark);

      var aBookmark = BookmarkResource.get({
        bookmarkId : 1
      });
      $httpBackend.flush();

      aBookmark.description = 'this';
      $httpBackend.expect('POST', '/rest/bookmarks/1', angular.toJson(aBookmark)).respond(200);

      aBookmark.$save({});
      $httpBackend.flush();
    });
  });
});
