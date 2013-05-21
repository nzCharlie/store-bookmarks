'use strict';

var autoGrowLink = function($scope, $element, $attrs) {   	
  // set the initial value of the textbox
  $element.autosize();
  var update = function() {
    $element.trigger('autosize');
  }
  $scope.$watch($attrs.ngModel, update);
} 

var menuCtrl = function($scope, $element) {
  $scope.navs = [];
  $scope.isCollapsed = false;

  $scope.select = function(nav) {
	angular.forEach($scope.navs, function(nav) {
	  nav.selected = false;
	});
	nav.selected = true;
  };

  this.addNav = function(nav) {
	if ($scope.navs.length == 0) $scope.select(nav); // select the first one by default
	$scope.navs.push(nav);
  }
}

var navLink = function(scope, element, attrs, menuCtrl) {
  menuCtrl.addNav(scope);
}

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
	transclude: true, // need to ensure child element survives 
	scope: {brand: '@'},
	controller: menuCtrl,
    template:
      '<div class="navbar navbar-fixed-top">'+
        '<div class="navbar-inner">'+
          '<div class="container">'+
            '<button type="button" class="btn btn-navbar" ng-model="isCollapsed" btn-checkbox>'+
              '<span class="icon-bar"></span>'+
              '<span class="icon-bar"></span>'+
              '<span class="icon-bar"></span>'+
            '</button>'+
            '<a class="brand" href="#">{{brand}}</a>'+
            '<div class="nav-collapse collapse" collapse="isCollapsed">'+
              '<ul class="nav">'+
			    '<li ng-repeat="nav in navs" ng-class="{active: nav.selected}">' +
				  '<a ng-href="#{{nav.href}}" ng-click="select(nav)"><i class="{{nav.iconClass}}"></i> {{nav.title}}</a>' +
				'</li>' +
              '</ul>'+
            '</div>'+
          '</div>'+
        '</div>'+
      '</div>',
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
	link: navLink,
	replace: false
  };
});
