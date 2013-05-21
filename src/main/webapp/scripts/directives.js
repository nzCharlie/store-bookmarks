'use strict';

var autoGrowLink = function($scope, $element, $attrs) {   	
  // set the initial value of the textbox
  $element.autosize();
  var update = function() {
    console.log('scope: ' + $scope.autoGrow);
    console.log($element.val());
    $element.trigger('autosize');
  }
  $scope.$watch($attrs.ngModel, update);
} 

angular.module('ui.directives', [])
.directive('autoGrow', function() {
  var directiveDefinitionObject = {
    restrict: 'A',
    link: autoGrowLink
  };
  return directiveDefinitionObject;
});