'use strict';

angular.module('ui.directives', [])
.directive('autoGrow', function() {
    return function(scope, element, attrs) {   	
    	element.autosize();
    	
    	var update = function() {
			element.trigger('autosize');
		}
    	    	
    	scope.$watch(attrs.autoGrow, update);
    	    			
		update();
    }
  });