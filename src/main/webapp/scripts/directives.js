'use strict';

var autoGrowLink = function($scope, $element, $attrs) {   	
  // set the initial value of the textbox
  $element.autosize();
  var update = function() {
    $element.trigger('autosize');
  }
  $scope.$watch($attrs.ngModel, update);
} 
autoGrowLink.$inject = ['$scope', '$element', '$attrs'];

var menuCtrl = function($scope) {
  $scope.isCollapsed = false;
}
menuCtrl.$inject = ['$scope'];

var navCtrl = function($scope, $element, $attrs, $transclude, $location) { 
  $scope.isActiveRoute = function() {
   return $scope.href === $location.path();
  };
}
navCtrl.$inject = ['$scope', '$element', '$attrs', '$transclude', '$location'];

angular.module('ui.directives', ['ui.bootstrap'])

.directive('autoGrow', function() {
  return {
    restrict: 'A',
    require: 'ngModel',
    link: autoGrowLink
  };
})

.directive('menu', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {brand: '@'},
    controller: menuCtrl,
    templateUrl: '/scripts/templates/menu.html',
    replace: true
  };
})

.directive('nav', function() {
  return {
    require: '^menu',
    restrict: 'E',
    scope: { 
      title: '@',
      iconClass: '@',
      href: '@'
    },
    templateUrl: '/scripts/templates/nav.html',
    controller: navCtrl,
    replace: true
  };
});
