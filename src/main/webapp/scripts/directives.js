'use strict';

var autoGrowLink = function($scope, $element, $attrs) {   	
  // set the initial value of the textbox
  $element.autosize();
  var update = function() {
    $element.trigger('autosize');
  }
  $scope.$watch($attrs.ngModel, update);
} 

angular.module('ui.directives', [])
.directive('autoGrow', function() {
  var directiveDefinitionObject = {
    restrict: 'A',
	require: 'ngModel',
    link: autoGrowLink
  };
  return directiveDefinitionObject;
});