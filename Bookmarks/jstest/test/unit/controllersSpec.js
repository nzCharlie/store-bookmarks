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
});
