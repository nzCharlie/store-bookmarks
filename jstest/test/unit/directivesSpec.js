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
    
    it ('should ensure by default isCollapsed should be false, navs should be empty', function() {
      expect(scope.isCollapsed).toBe(false);
      expect(scope.navs.length).toBe(0);
    });
    
    it ('should ensure adding a nav should it added to navs ', function() {
      var nav1 = {};
      var nav2 = {};
    
      controllerUnderTest.addNav(nav1);
      expect(scope.navs.length).toBe(1);
      expect(scope.navs[0]).toBe(nav1);
      
      controllerUnderTest.addNav(nav2);
      expect(scope.navs.length).toBe(2);
      expect(scope.navs[1]).toBe(nav2);
    });
    
    it ('should ensure adding the first nav should be selected ', function() {
      var nav = {};
    
      controllerUnderTest.addNav(nav);
      expect(scope.navs.length).toBe(1);
      expect(scope.navs[0].selected).toBe(true);
    });
    
    it ('should be able to select the specific nav ', function() {
      var nav1 = {};
      var nav2 = {};
    
      controllerUnderTest.addNav(nav1);
      expect(scope.navs[0].selected).toBe(true);
      expect(scope.navs[0]).toBe(nav1);
      
      controllerUnderTest.addNav(nav2);
      expect(scope.navs.length).toBe(2);
      expect(scope.navs[1].selected).toBeFalsy();
      expect(scope.navs[1]).toBe(nav2);
      
      scope.select(nav2);
      expect(nav2.selected).toBe(true);
      expect(nav1.selected).toBeFalsy();
    });
  });
  
  describe('navLink', function() {
    var scope, menuCtrlMock;
    
    beforeEach(inject(function($rootScope){
      scope = $rootScope.$new();
      
      menuCtrlMock = jasmine.createSpyObj('menuCtrlMock', ['addNav']);
      var elm = jasmine.createSpy('elm');
      var attrs = jasmine.createSpy('attrs');
      
      navLink(scope, elm, attrs, menuCtrlMock);
    }));
    
    it ('should have called addNav', function() {
      expect(menuCtrlMock.addNav).toHaveBeenCalledWith(scope);
    });
  
  });
});
