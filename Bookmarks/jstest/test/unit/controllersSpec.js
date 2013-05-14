'use strict';

/* jasmine specs for controllers go here */

describe('controllers', function(){
  beforeEach(module('bookmarksCtrl'));
  
  describe('MenuCtrl', function () {
	 var ctrl, scope, $rootScope;
	 
	 beforeEach(inject(function(_$rootScope_, $controller) {
		 $rootScope = _$rootScope_;
		 scope = $rootScope.$new();
		 
		 ctrl = $controller('MenuCtrl', {$scope: scope});
	 }));
	 
	 it('should initialise isCollapsed with true', function(){
		 expect(scope.isCollapsed).toBe(true);
	 });
	 
	 it('should be active when switchNav to about', function(){
		 // default to not active
		 expect(scope.aboutNavActive).toBe('');
		 
		 $rootScope.$broadcast('switchNav', 'about');
		 expect(scope.aboutNavActive).toBe('active');
	 });
	 
	 it('should be active when switchNav to home', function(){
		 // default to active
		 expect(scope.homeNavActive).toBe('active');
		 
		 $rootScope.$broadcast('switchNav', 'home');
		 expect(scope.homeNavActive).toBe('active');
	 });
  });
  
  describe('MenuCtrl', function () {
	  
  });
});
