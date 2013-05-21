'use strict';

/* jasmine specs for directives go here */

describe('directives', function() {
  var elm, scope, attrs;
	
  beforeEach(module('ui.directives'));
  
  beforeEach(inject(function($rootScope, $compile){
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
