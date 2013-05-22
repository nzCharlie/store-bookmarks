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
    var scope, locationMock;
    
    beforeEach(inject(function($rootScope){
      scope = $rootScope.$new();
      locationMock = jasmine.createSpyObj('$location', ['path']);
      
      navCtrl(scope, null, null, null, locationMock);
    }));
    
    it ('should be active if href is the same', function() {
      var currentPath = '/testing';
    
      scope.href = currentPath;
      locationMock.path.andCallFake(function () {
        return currentPath;
      });
      
      expect(scope.isActiveRoute()).toBe(true);
    });
    
    it ('should not be active if href is the same', function() {
      var currentPath = '/testing';
    
      scope.href = currentPath + "blah";
      locationMock.path.andCallFake(function () {
        return currentPath;
      });
      
      expect(scope.isActiveRoute()).toBe(false);
    });
  
  });
});
