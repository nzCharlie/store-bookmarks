'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {

  beforeEach(module('ui.directives'));

  beforeEach(module('ui.bootstrap'));

  describe('autoGrowLink', function() {
    var elm, scope, attrs;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
      elm = angular.element('<textarea rows="1" auto-grow></textarea>');
      elm.autosize = jasmine.createSpy('autosize');
      elm.trigger = jasmine.createSpy('trigger');
      elm.value = 'test';
      attrs = {
        ngModel : ''
      };

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
    var scope;

    beforeEach(inject(function($rootScope, $controller) {
      scope = $rootScope.$new();

      $controller('menuCtrl', {
        $scope : scope
      });
    }));

    it('should ensure by default isCollapsed should be true', function() {
      expect(scope.isCollapsed).toBe(true);
    });

  });

  describe('navCtrl', function() {
    var scope, attrs, locationMock;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
      locationMock = jasmine.createSpyObj('$location', [ 'path' ]);
      attrs = {};
    }));

    it('should be active if href is the same', function() {
      var currentPath = '/testing';

      scope.href = currentPath;
      attrs.href = scope.href;
      locationMock.path.andCallFake(function() {
        return currentPath;
      });

      navCtrl(scope, null, attrs, null, locationMock);

      expect(scope.isActiveRoute()).toBeTruthy();
    });

    it('should be active if matchExp matches', function() {
      var currentPath = '/testing/afafdadf';

      scope.href = currentPath;
      attrs.matchExp = '/testing(/.+)?';
      locationMock.path.andCallFake(function() {
        return currentPath;
      });

      navCtrl(scope, null, attrs, null, locationMock);

      expect(scope.isActiveRoute()).toBeTruthy();
    });

    it('should be active if matchExp does not match', function() {
      var currentPath = '/testinadfadf';

      scope.href = currentPath;
      attrs.matchExp = '/testing(/.+)?';
      locationMock.path.andCallFake(function() {
        return currentPath;
      });

      navCtrl(scope, null, attrs, null, locationMock);

      expect(scope.isActiveRoute()).toBeFalsy();
    });

    it('should not be active if href is the same', function() {
      var currentPath = '/testing';

      scope.href = currentPath + "blah";
      attrs.href = scope.href;
      locationMock.path.andCallFake(function() {
        return currentPath;
      });

      navCtrl(scope, null, attrs, null, locationMock);

      expect(scope.isActiveRoute()).toBeFalsy();
    });

  });

  describe('loadContainerCtrl', function() {
    var scope, loadingTopic;

    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
      loadingTopic = jasmine.createSpyObj('loadingTopic', [ 'addListener' ]);

      loadContainerCtrl(scope, null, null, null, loadingTopic);
    }));

    it('should default to isLoading', function() {
      expect(scope.isLoading).toBe(false);
    });

    it('should added a listener function to the topic', function() {
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

    it('should set isLoading to true when startLoading greater than finishLoading', function() {
      var listenerFunc = loadingTopic.addListener.argsForCall[0][0];

      listenerFunc('startLoading');
      listenerFunc('startLoading');
      listenerFunc('finishLoading');
      expect(scope.isLoading).toBe(true);
    });

    it('should set isLoading to false when startLoading equal to finishLoading', function() {
      var listenerFunc = loadingTopic.addListener.argsForCall[0][0];

      listenerFunc('startLoading');
      listenerFunc('startLoading');
      listenerFunc('finishLoading');
      listenerFunc('finishLoading');
      expect(scope.isLoading).toBe(false);
    });

    it('should set isLoading to false when startLoading less than finishLoading', function() {
      var listenerFunc = loadingTopic.addListener.argsForCall[0][0];

      listenerFunc('startLoading');
      listenerFunc('startLoading');
      listenerFunc('finishLoading');
      listenerFunc('finishLoading');
      listenerFunc('finishLoading');
      expect(scope.isLoading).toBe(false);
    });

    it('should ensure that finishingLoading before startLoading does not count.', function() {
      var listenerFunc = loadingTopic.addListener.argsForCall[0][0];

      listenerFunc('finishLoading');
      listenerFunc('startLoading');
      listenerFunc('startLoading');
      listenerFunc('finishLoading');
      expect(scope.isLoading).toBe(true);
    });
  });
  
  describe('markdownLink', function() {
    var scope, element, ShowndownConverterMock;
    
    beforeEach(inject(function($rootScope) {
      scope = $rootScope.$new();
      element = angular.element('<div markdown></div>');
      ShowndownConverterMock = jasmine.createSpy('ShowndownConverter');
      
      markdownLink(scope, element, ShowndownConverterMock);
    }));
    
    it ('it should be watch element.html() and then calls ShowdownConverter', function (){
      var textValue = 'blah';
      
      scope.$apply(function () {
        element.html(textValue);
      });
      expect(ShowndownConverterMock).toHaveBeenCalledWith(textValue);
    });
  });
});
