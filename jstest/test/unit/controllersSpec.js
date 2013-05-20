'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bookmarksCtrl'));
  
  describe('MenuCtrl, when current path is /about ', function () {
	 var scope, $rootScope, locationMock;
	 
	 beforeEach(function(){
		this.addMatchers({
			toHaveActiveNavAs: function (expectedNavActive) {
				var endsWith = function (str, suffix) {
				    return str.indexOf(suffix, str.length - suffix.length) !== -1;
				}
				
				var expectedNavKey = expectedNavActive + 'NavActive'; 
				for (var navs in this.actual) {
					if (endsWith(navs, 'NavActive')) {
						var expected = (navs == expectedNavKey) ? 'active' : '';
						if (this.actual[navs] != expected) {
							console.log(navs, ' is expected to be ', expected, ' actual ', this.actual[navs]);
							return false;
						}
					}
				} 
				return true;
			}
		}); 
	 });
	 
	 beforeEach(inject(function(_$rootScope_, $controller) {
		 $rootScope = _$rootScope_;
		 scope = $rootScope.$new();
		 
		 locationMock = jasmine.createSpyObj('locationMock', ['path'])
		 locationMock.path.andCallFake(function () {
			return '/about'; 
		 });
		 
		 $controller('MenuCtrl', {$scope: scope, $location: locationMock});
	 }));
	 
	 describe('when current path is home', function () {
		 beforeEach(inject(function(_$rootScope_, $controller) {
			 $rootScope = _$rootScope_;
			 scope = $rootScope.$new();
			 
			 locationMock = jasmine.createSpyObj('locationMock', ['path'])
			 locationMock.path.andCallFake(function () {
				return '/home'; 
			 });
			 
			 $controller('MenuCtrl', {$scope: scope, $location: locationMock});
		 }));
		 
		 it('should make home to be active when current path is /home', function (){
				expect(scope).toHaveActiveNavAs('home');
		 }); 
	 });
	 
	 it('should initialise isCollapsed with true', function(){
		 expect(scope.isCollapsed).toBe(true);
	 });
	 
	 it('should make about to be active when current path is /about', function (){
		expect(scope).toHaveActiveNavAs('about');
	 }); 
	 
	 it('should make about to be active when switchNav to about', function(){
		 $rootScope.$broadcast('switchNav', 'about');
		 
		 expect(scope).toHaveActiveNavAs('about');
	 });
	 
	 it('should make home to be active when switchNav to home', function(){	 
		 $rootScope.$broadcast('switchNav', 'home');
		 
		 expect(scope).toHaveActiveNavAs('home');
	 });
  });
  
  describe('LoadingCtrl', function () {
	 var scope, $rootScope;
		 
	 beforeEach(inject(function(_$rootScope_, $controller) {
		 $rootScope = _$rootScope_;
		 scope = $rootScope.$new();
		 
		 $controller('LoadingCtrl', {$scope: scope});
	 }));
	 
	 it('should default to isLoading', function(){
		 expect(scope.isLoading).toBe(true);
	 });
	 
	 it('should set isLoading to false when finishLoading', function() {
		 $rootScope.$broadcast('finishLoading');
		 expect(scope.isLoading).toBe(false);
	 });
	 
	 it('should set isLoading to true when startLoading', function() {
		 $rootScope.$broadcast('startLoading');
		 expect(scope.isLoading).toBe(true);
	 });
  });
  
  describe('AboutCtrl', function () {
	 var scope, rootScopeMock;
		 
	 beforeEach(inject(function($rootScope, $controller) {
		 scope = $rootScope.$new();
		 rootScopeMock = jasmine.createSpyObj('rootScopeMock',['$broadcast']); 
		 
		 $controller('AboutCtrl', {$scope: scope, $rootScope: rootScopeMock});
	 }));
	 
	 it('should have broadcasted its location as about', function() {
		expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('switchNav', 'about'); 
	 });
	 
  });
  
  describe('BookmarksListCtrl', function () {
	 var scope, rootScopeMock, Session, BookmarkMock;
	 
	 beforeEach(function(){
		this.addMatchers({
			toHaveCorrectSortViewValues: function (expectedSortProperties) {
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
				if (this.actual.sortDirectionIconClass != expectedIconClass){
					console.log('sortDirectionIconClass: expected ', expectedIconClass, ' actual ', this.actual.sortDirectionIconClass);
					return false;
				}
				
				var expectedSortPrefix = !expectedIsAscendingSort ? '-' : '';
				var expectedSort = expectedSortPrefix + expectedSortSelection;
				if (this.actual.sort != expectedSort){
					console.log('sort: expected ', expectedSort, ' actual ', this.actual.sort);
					return false;
				}
				
				return true;
			}
		}); 
	 });
	 
	 beforeEach(inject(function($rootScope, $controller) {
		 scope = $rootScope.$new();
		 rootScopeMock = jasmine.createSpyObj('rootScopeMock',['$broadcast']);
		 BookmarkMock = jasmine.createSpyObj('BookmarkMock', ['query']);
		 BookmarkMock.query.andCallFake(function () {
			 return 'Bookmark.query called';
		 });
		 
		 Session = {isAscendingSort : false, sortSelection : 'someProperty'};
		 
		 $controller('BookmarksListCtrl', {$scope: scope, $rootScope: rootScopeMock, Bookmark: BookmarkMock, Session: Session});
	 }));
	 
	 describe("Default behaviour", function(){
		 
		 beforeEach(inject(function($rootScope, $controller) {		 
			 scope = $rootScope.$new();
			 rootScopeMock = jasmine.createSpyObj('rootScope',['$broadcast']);
			 BookmarkMock = jasmine.createSpyObj('Bookmark', ['query']);
			 Session = {};

			 $controller('BookmarksListCtrl', {$scope: scope, $rootScope: rootScopeMock, Bookmark: BookmarkMock, Session: Session});
		 }));
		 
		 it('should have default to ascording sort by name', function(){
			 expect(scope).toHaveCorrectSortViewValues({sortSelection: 'name', isAscendingSort: true}); 
		 });
		  
	 });
	 
	 it('should have updated Session values to be same as scope', function(){
		 expect(Session.isAscendingSort).toBe(scope.isAscendingSort);
		 expect(Session.sortSelection).toBe(scope.sortSelection);
	 });
	 
	 it('should have updated sort values when sortSelection changed', function(){
		 scope.sortSelection = 'somethingElse';
		 scope.$digest();
		 
		 expect(scope).toHaveCorrectSortViewValues({sortSelection: 'somethingElse', isAscendingSort: false});
	 });

	 it('should have updated sort values when isAscendingSort changed', function(){
		 scope.isAscendingSort = true;
		 scope.$digest();
		 
		 expect(scope).toHaveCorrectSortViewValues({sortSelection: 'someProperty', isAscendingSort: true});
	 });
	 
	 it('should have broadcasted its location as home', function() {
		expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('switchNav', 'home'); 
	 });
	 
	 it('should have queried Bookmark service for bookmarks', function() {
		expect(BookmarkMock.query).toHaveBeenCalledWith({}, jasmine.any(Function)); 
	 });
	 
	 it('should have queried Bookmark service for bookmarks', function() {
		expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('startLoading');
		expect(scope.bookmarks).toBe('Bookmark.query called');

		// second param is the success function
		var loadingFunc = BookmarkMock.query.argsForCall[0][1];
		loadingFunc();
		expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('finishLoading');
	 });
	 
	 it('should have a function: deleteBookmark to delete bookmark, which will reload bookmarks', function(){	 
		expect(scope.deleteBookmark).toBeDefined();
		
		var bookmark = jasmine.createSpyObj('bookmark', ['$delete']);
		bookmark.id = 1;
		
		rootScopeMock.$broadcast.reset();
		BookmarkMock.query.reset();
		
		scope.deleteBookmark(bookmark);
		expect(bookmark.$delete).toHaveBeenCalledWith({bookmarkId: 1}, jasmine.any(Function));
		
		var deleteBookmarkSuccessFunc = bookmark.$delete.argsForCall[0][1];
		deleteBookmarkSuccessFunc();
		
		expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('startLoading');
		expect(scope.bookmarks).toBe('Bookmark.query called');
		// second param is the success function
		var loadingFunc = BookmarkMock.query.argsForCall[0][1];
		loadingFunc();
		expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('finishLoading');
	 });
	 
	 it('should have a function check if the description of a bookmark has content or not', function(){
		 expect(scope.hasDescription).toBeDefined();
		 
		 expect(scope.hasDescription({description: ''})).not.toBe(true);
		 expect(scope.hasDescription({description: '    '})).not.toBe(true);
		 expect(scope.hasDescription({description: 'fsdfsf'})).toBe(true);
		 expect(scope.hasDescription({description: '  fsdfsf'})).toBe(true);
		 expect(scope.hasDescription({description: 'fsdfsf  '})).toBe(true);
		 expect(scope.hasDescription({description: '  fsdfsf  '})).toBe(true);
	 });
	 	 
  });
  
  describe('BookmarkAddCtrl', function () {
	 var scope, rootScopeMock, location, BookmarkMock;
		 
	 beforeEach(inject(function($rootScope, $controller) {
		 scope = $rootScope.$new();
		 rootScopeMock = jasmine.createSpyObj('rootScopeMock',['$broadcast']); 
		 location = jasmine.createSpyObj('location', ['path'])
		 BookmarkMock = jasmine.createSpyObj('Bookmark', ['create']);
		 
		 $controller('BookmarkAddCtrl', {$scope: scope, $rootScope: rootScopeMock, $location: location, Bookmark: BookmarkMock});
	 }));
	 
	 it('should have action as add', function() {
		 expect(scope.action).toBe('Add');
	 });
	 
	 it ('should call Bookmark.create on submit', function() {
		 var childScope = scope.$new();
		 var savingRaised = false;
		 var savedRaised = false;
		 childScope.$on('saving', function(){
			 savingRaised = true;
		 });
		 childScope.$on('saved', function(){
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
  
  describe('BookmarkEditCtrl', function () {
	 var scope, rootScopeMock, location, BookmarkMock, aBookmark, loadId;
		 
	 beforeEach(inject(function($rootScope, $controller) {
		 scope = $rootScope.$new();
		 rootScopeMock = jasmine.createSpyObj('rootScopeMock',['$broadcast']); 
		 location = jasmine.createSpyObj('location', ['path'])
		 BookmarkMock = jasmine.createSpyObj('BookmarkMock', ['get']);
		 loadId = 1;
		 aBookmark = {
				 id: loadId,
				 name: 'aName',
				 url: 'aUrl',
				 description: 'aDescription',
				 $save : jasmine.createSpy('$save')
		 };
		 BookmarkMock.get.andCallFake(function() {
			return aBookmark; 
		 });
		 
		 $controller('BookmarkEditCtrl', {$scope: scope, $rootScope: rootScopeMock, $location: location, Bookmark: BookmarkMock, $routeParams : {bookmarkId: loadId}});
	 }));
	 
	 it('should have action as edit', function() {
		 expect(scope.action).toBe('Edit');
	 });
	 
	 it('should have properties as loaded', function () {
		 expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('startLoading');
		 expect(BookmarkMock.get).toHaveBeenCalledWith({bookmarkId: loadId}, jasmine.any(Function));
		 
		 var loadingFunc = BookmarkMock.get.argsForCall[0][1];
		 loadingFunc();
		 expect(scope.name).toBe(aBookmark.name);
		 expect(scope.url).toBe(aBookmark.url);
		 expect(scope.description).toBe(aBookmark.description);
		 expect(rootScopeMock.$broadcast).toHaveBeenCalledWith('finishLoading');
	 });
	 
	 it ('should call bookmark.$save on submit', function() {
		 var childScope = scope.$new();
		 var savingRaised = false;
		 var savedRaised = false;
		 childScope.$on('saving', function(){
			 savingRaised = true;
		 });
		 childScope.$on('saved', function(){
			 savedRaised = true;
		 });
		 var updated = {name: 'diffName', url: 'diffUrl', description: 'diffDescription'}
		 scope.$parent.$broadcast('submit', updated);
		 expect(aBookmark.name).toBe(updated.name);
		 expect(aBookmark.url).toBe(updated.url);
		 expect(aBookmark.description).toBe(updated.description);
		 
		 expect(aBookmark.$save).toHaveBeenCalledWith({bookmarkId: ''}, jasmine.any(Function));
		 expect(savingRaised).toBe(true);
		 
		 var savedFunc = aBookmark.$save.argsForCall[0][1];
		 savedFunc();
		 expect(savedRaised).toBe(true);
		 expect(location.path).toHaveBeenCalledWith('/bookmarks');
	 });
	 
  });
  
  describe('BookmarkFormCtrl', function () {
	 var scope;
		 
	 beforeEach(inject(function($rootScope, $controller) {
		 scope = $rootScope.$new();
		 
		 $controller('BookmarkFormCtrl', {$scope: scope});
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
				 name: 'aName',
				 url: 'aUrl',
				 description: 'aDescription'
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

	 it ('should haved trimed name when submitting', function () {
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

	 it ('should haved trimed description when submitting', function () {
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