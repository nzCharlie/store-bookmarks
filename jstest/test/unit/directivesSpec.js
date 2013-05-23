'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  beforeEach(module('ui.directives'));
  
  beforeEach(module('ui.bootstrap'));
  
  describe('autoGrowLink', function() {
    var elm, scope, attrs;
  
    beforeEach(inject(function($rootScope){
      scope = $rootScope.$new();
      elm = angular.element('<textarea rows="1" auto-grow></textarea>');
      elm.autosize = jasmine.createSpy('autosize');
      elm.trigger = jasmine.createSpy('trigger');
      elm.value = 'test';
      attrs = {ngModel: ''};
    
      autoGrowLink(scope, elm, attrs);
    }));
    
    it('should call autosize', function() {
      expect(elm.autosize).toHaveBeenCalled();
    });
    
    it('should trigger autosize when attrs value changed', function() {	
      attrs.ngModel = 'testing';
      scope.$digest();
      
      expect(elm.trigger.calls.length).toBe(1);
      expect(elm.trigger).toHaveBeenCalledWith('autosize');
    });
  });

  describe('menuCtrl', function() {
    var scope, controllerUnderTest;
    
    beforeEach(inject(function($rootScope, $controller){
      scope = $rootScope.$new();
      
      controllerUnderTest = $controller('menuCtrl', {$scope: scope});
    }));
    
    it ('should ensure by default isCollapsed should be false', function() {
      expect(scope.isCollapsed).toBe(false);
    });
    
  });
  
  describe('navCtrl', function() {
    var scope, attrs, locationMock;
    
    beforeEach(inject(function($rootScope){
      scope = $rootScope.$new();
      locationMock = jasmine.createSpyObj('$location', ['path']);
      attrs = {};      
    }));
    
    it ('should be active if href is the same', function() {
      var currentPath = '/testing';
    
      scope.href = currentPath;
      attrs.href = scope.href;
      locationMock.path.andCallFake(function () {
        return currentPath;
      });
      
      navCtrl(scope, null, attrs, null, locationMock);
      
      expect(scope.isActiveRoute()).toBeTruthy();
    });
    
    it ('should be active if matchExp matches', function() {
      var currentPath = '/testing/afafdadf';
  
      scope.href = currentPath;
      attrs.matchExp = '/testing(/.+)?';
      locationMock.path.andCallFake(function () {
        return currentPath;
      });
    
      navCtrl(scope, null, attrs, null, locationMock);
    
      expect(scope.isActiveRoute()).toBeTruthy();
    });

    it ('should be active if matchExp does not match', function() {
      var currentPath = '/testinadfadf';

      scope.href = currentPath;
      attrs.matchExp = '/testing(/.+)?';
      locationMock.path.andCallFake(function () {
        return currentPath;
      });
  
      navCtrl(scope, null, attrs, null, locationMock);
  
      expect(scope.isActiveRoute()).toBeFalsy();
    });
    
    it ('should not be active if href is the same', function() {
      var currentPath = '/testing';
    
      scope.href = currentPath + "blah";
      attrs.href = scope.href;
      locationMock.path.andCallFake(function () {
        return currentPath;
      });
      
      navCtrl(scope, null, attrs, null, locationMock);
      
      expect(scope.isActiveRoute()).toBeFalsy();
    });
  
  });
  
  describe('loadContainerCtrl', function () {
	 var scope, loadingTopic;
		 
	 beforeEach(inject(function($rootScope) {
		 scope = $rootScope.$new();
		 loadingTopic = jasmine.createSpyObj('loadingTopic', ['addListener']);
		 
		 loadContainerCtrl(scope, null, null, null, loadingTopic);
	 }));
	 
	 it('should default to isLoading', function(){
		 expect(scope.isLoading).toBe(true);
	 });
	 
	 it('should added a listener function to the topic', function(){
		 expect(loadingTopic.addListener).toHaveBeenCalledWith(jasmine.any(Function));
	 });
	 
	 it('should set isLoading to false when finishLoading', function() {
		 var listenerFunc = loadingTopic.addListener.argsForCall[0][0];
		 listenerFunc('finishLoading');
		 expect(scope.isLoading).toBe(false);
	 });
	 
	 it('should set isLoading to true when startLoading', function() {
		 var listenerFunc = loadingTopic.addListener.argsForCall[0][0];
		 listenerFunc('startLoading');
		 expect(scope.isLoading).toBe(true);
	 });
  });
});
