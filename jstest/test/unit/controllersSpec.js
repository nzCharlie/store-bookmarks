'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function() {
  beforeEach(module('bookmarksCtrl'));

  describe('BookmarksListCtrl', function() {
    var scope, session, BookmarkMock;

    beforeEach(function() {
      this.addMatchers({
        toHaveCorrectSortViewValues : function(expectedSortProperties) {
          var expectedSortSelection = expectedSortProperties.sortSelection;
          var expectedIsAscendingSort = expectedSortProperties.isAscendingSort;

          if (this.actual.isAscendingSort != expectedIsAscendingSort) {
            console.log('isAscendingSort: expected ', expectedIsAscendingSort, ' actual ', this.actual.isAscendingSort);
            return false;
          }

          if (this.actual.sortSelection != expectedSortSelection) {
            console.log('sortSelection: expected ', expectedSortSelection, ' actual ', this.actual.sortSelection);
            return false;
          }

          var expectedIconClass = !expectedIsAscendingSort ? 'icon-arrow-down' : 'icon-arrow-up';
          if (this.actual.sortDirectionIconClass != expectedIconClass) {
            console.log('sortDirectionIconClass: expected ', expectedIconClass, ' actual ', this.actual.sortDirectionIconClass);
            return false;
          }

          var expectedSortPrefix = !expectedIsAscendingSort ? '-' : '';
          var expectedSort = expectedSortPrefix + expectedSortSelection;
          if (this.actual.sort != expectedSort) {
            console.log('sort: expected ', expectedSort, ' actual ', this.actual.sort);
            return false;
          }

          return true;
        }
      });
    });

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      BookmarkMock = jasmine.createSpyObj('BookmarkMock', [ 'query' ]);
      BookmarkMock.query.andCallFake(function() {
        return 'Bookmark.query called';
      });

      session = {
        isAscendingSort : false,
        sortSelection : 'someProperty'
      };

      $controller('BookmarksListCtrl', {
        $scope : scope,
        Bookmark : BookmarkMock,
        session : session
      });
    }));

    describe("Default behaviour", function() {

      beforeEach(inject(function($rootScope, $controller) {
        scope = $rootScope.$new();
        BookmarkMock = jasmine.createSpyObj('Bookmark', [ 'query' ]);
        session = {};

        $controller('BookmarksListCtrl', {
          $scope : scope,
          Bookmark : BookmarkMock,
          session : session
        });
      }));

      it('should have default to ascording sort by name', function() {
        expect(scope).toHaveCorrectSortViewValues({
          sortSelection : 'name',
          isAscendingSort : true
        });
      });

    });

    it('should have updated Session values to be same as scope', function() {
      expect(session.isAscendingSort).toBe(scope.isAscendingSort);
      expect(session.sortSelection).toBe(scope.sortSelection);
    });

    it('should have updated sort values when sortSelection changed', function() {
      scope.sortSelection = 'somethingElse';
      scope.$digest();

      expect(scope).toHaveCorrectSortViewValues({
        sortSelection : 'somethingElse',
        isAscendingSort : false
      });
    });

    it('should have updated sort values when isAscendingSort changed', function() {
      scope.isAscendingSort = true;
      scope.$digest();

      expect(scope).toHaveCorrectSortViewValues({
        sortSelection : 'someProperty',
        isAscendingSort : true
      });
    });

    it('should have queried Bookmark service for bookmarks', function() {
      expect(BookmarkMock.query).toHaveBeenCalledWith({});
    });

    it('should have a function: deleteBookmark to delete bookmark, which will reload bookmarks', function() {
      expect(scope.deleteBookmark).toBeDefined();

      var bookmark = jasmine.createSpyObj('bookmark', [ '$delete' ]);
      bookmark.id = 1;

      BookmarkMock.query.reset();

      scope.deleteBookmark(bookmark);
      expect(bookmark.$delete).toHaveBeenCalledWith({
        bookmarkId : 1
      }, jasmine.any(Function));

      var deleteBookmarkSuccessFunc = bookmark.$delete.argsForCall[0][1];
      deleteBookmarkSuccessFunc();

      expect(scope.bookmarks).toBe('Bookmark.query called');
    });

    it('should have a function check if the description of a bookmark has content or not', function() {
      expect(scope.hasDescription).toBeDefined();

      expect(scope.hasDescription({
        description : ''
      })).not.toBe(true);
      expect(scope.hasDescription({
        description : '    '
      })).not.toBe(true);
      expect(scope.hasDescription({
        description : 'fsdfsf'
      })).toBe(true);
      expect(scope.hasDescription({
        description : '  fsdfsf'
      })).toBe(true);
      expect(scope.hasDescription({
        description : 'fsdfsf  '
      })).toBe(true);
      expect(scope.hasDescription({
        description : '  fsdfsf  '
      })).toBe(true);
    });

  });

  describe('BookmarkAddCtrl', function() {
    var scope, location, BookmarkMock;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      location = jasmine.createSpyObj('location', [ 'path' ])
      BookmarkMock = jasmine.createSpyObj('Bookmark', [ 'create' ]);

      $controller('BookmarkAddCtrl', {
        $scope : scope,
        $location : location,
        Bookmark : BookmarkMock
      });
    }));

    it('should have action as add', function() {
      expect(scope.action).toBe('Add');
    });

    it('should call Bookmark.create on submit', function() {
      var childScope = scope.$new();
      var savingRaised = false;
      var savedRaised = false;
      childScope.$on('saving', function() {
        savingRaised = true;
      });
      childScope.$on('saved', function() {
        savedRaised = true;
      });
      scope.$parent.$broadcast('submit', 'bookmark');

      expect(BookmarkMock.create).toHaveBeenCalledWith('bookmark', jasmine.any(Function));
      expect(savingRaised).toBe(true);

      var savedFunc = BookmarkMock.create.argsForCall[0][1];
      savedFunc();
      expect(savedRaised).toBe(true);
      expect(location.path).toHaveBeenCalledWith('/bookmarks');
    });

  });

  describe('BookmarkEditCtrl', function() {
    var scope, location, BookmarkMock, aBookmark, loadId;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();
      location = jasmine.createSpyObj('location', [ 'path' ])
      BookmarkMock = jasmine.createSpyObj('BookmarkMock', [ 'get' ]);
      loadId = 1;
      aBookmark = {
        id : loadId,
        name : 'aName',
        url : 'aUrl',
        description : 'aDescription',
        $save : jasmine.createSpy('$save')
      };
      BookmarkMock.get.andCallFake(function() {
        return aBookmark;
      });

      $controller('BookmarkEditCtrl', {
        $scope : scope,
        $location : location,
        Bookmark : BookmarkMock,
        $routeParams : {
          bookmarkId : loadId
        }
      });
    }));

    it('should have action as edit', function() {
      expect(scope.action).toBe('Edit');
    });

    it('should have properties as loaded', function() {
      expect(BookmarkMock.get).toHaveBeenCalledWith({
        bookmarkId : loadId
      }, jasmine.any(Function));

      var loadingFunc = BookmarkMock.get.argsForCall[0][1];
      loadingFunc();
      expect(scope.name).toBe(aBookmark.name);
      expect(scope.url).toBe(aBookmark.url);
      expect(scope.description).toBe(aBookmark.description);
    });

    it('should call bookmark.$save on submit', function() {
      var childScope = scope.$new();
      var savingRaised = false;
      var savedRaised = false;
      childScope.$on('saving', function() {
        savingRaised = true;
      });
      childScope.$on('saved', function() {
        savedRaised = true;
      });
      var updated = {
        name : 'diffName',
        url : 'diffUrl',
        description : 'diffDescription'
      }
      scope.$parent.$broadcast('submit', updated);
      expect(aBookmark.name).toBe(updated.name);
      expect(aBookmark.url).toBe(updated.url);
      expect(aBookmark.description).toBe(updated.description);

      expect(aBookmark.$save).toHaveBeenCalledWith({
        bookmarkId : ''
      }, jasmine.any(Function));
      expect(savingRaised).toBe(true);

      var savedFunc = aBookmark.$save.argsForCall[0][1];
      savedFunc();
      expect(savedRaised).toBe(true);
      expect(location.path).toHaveBeenCalledWith('/bookmarks');
    });

  });

  describe('BookmarkFormCtrl', function() {
    var scope;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();

      $controller('BookmarkFormCtrl', {
        $scope : scope
      });
    }));

    it('should default to not in saving mode', function() {
      expect(scope.isSaving).toBe(false);
    });

    it('should be in saving mode when receiving saving event', function() {
      scope.$parent.$broadcast('saving');
      expect(scope.isSaving).toBe(true);
    });

    it('should be in saving mode when receiving saving event', function() {
      scope.isSaving = true;

      scope.$parent.$broadcast('saved');
      expect(scope.isSaving).toBe(false);
    });

    it('should raise submit event when submitting', function() {
      var expectedBookmark = {
        name : 'aName',
        url : 'aUrl',
        description : 'aDescription'
      };
      var actualBookmark;
      var submitRaised = false;
      scope.$parent.$on('submit', function(event, _actualBookmark) {
        submitRaised = true;
        actualBookmark = _actualBookmark;
      });
      scope.name = expectedBookmark.name;
      scope.url = expectedBookmark.url;
      scope.description = expectedBookmark.description;

      scope.submit();
      expect(submitRaised).toBe(true);
      expect(actualBookmark.name).toEqual(expectedBookmark.name);
      expect(actualBookmark.url).toEqual(expectedBookmark.url);
      expect(actualBookmark.description).toEqual(expectedBookmark.description);
    });

    it('should haved trimed name when submitting', function() {
      var actualBookmark;
      scope.$parent.$on('submit', function(event, _actualBookmark) {
        actualBookmark = _actualBookmark;
      });

      scope.name = '   name';
      scope.submit();
      expect(actualBookmark.name).toEqual('name');

      scope.name = 'name   ';
      scope.submit();
      expect(actualBookmark.name).toEqual('name');

      scope.name = '   ';
      scope.submit();
      expect(actualBookmark.name).toEqual('');
    });

    it('should haved trimed description when submitting', function() {
      var actualBookmark;
      scope.$parent.$on('submit', function(event, _actualBookmark) {
        actualBookmark = _actualBookmark;
      });

      scope.description = '   description';
      scope.submit();
      expect(actualBookmark.description).toEqual('description');

      scope.description = 'description   ';
      scope.submit();
      expect(actualBookmark.description).toEqual('description');

      scope.description = '   ';
      scope.submit();
      expect(actualBookmark.description).toEqual('');
    });

  });

});
