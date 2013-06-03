'use strict';

function autoGrowLink($scope, $element, $attrs) {
	$element.autosize();
	var update = function() {
		$element.trigger('autosize');
	};
	$scope.$watch($attrs.ngModel, update);
};
autoGrowLink.$inject = [ '$scope', '$element', '$attrs' ];

function menuCtrl($scope) {
	$scope.isCollapsed = true;
};
menuCtrl.$inject = [ '$scope' ];

function navCtrl($scope, $element, $attrs, $transclude, $location) {
	var matchExp = $attrs.matchExp;
	if (!angular.isDefined($attrs.matchExp)) {
		matchExp = $attrs.href;
	}
	$scope.matchRe = new RegExp(matchExp);

	$scope.isActiveRoute = function() {
		return $location.path().match($scope.matchRe);
	};
};
navCtrl.$inject = [ '$scope', '$element', '$attrs', '$transclude', '$location' ];

angular.module('ui.directives', [ 'ui.bootstrap' ])

.directive('autoGrow', function() {
	return {
		restrict : 'AC',
		require : 'ngModel',
		link : autoGrowLink
	};
})

.directive('menu', function() {
	return {
		restrict : 'EC',
		transclude : true,
		scope : {
			brand : '@'
		},
		controller : menuCtrl,
		templateUrl : '/scripts/templates/menu.html',
		replace : true
	};
})

.directive('nav', function() {
	return {
		require : '^menu',
		restrict : 'EC',
		scope : {
			title : '@',
			iconClass : '@',
			href : '@'
		},
		templateUrl : '/scripts/templates/nav.html',
		controller : navCtrl,
		replace : true
	};
})

// TODO create actionable button that will change to spinning icon when pressed and awaits for callback to back to normal.
// example: delete/edit/save buttons 
//.directive('action', function() {
//  return {
//    
//  };
//})
;

/**
 * Loader directive
 */

function loadContainerCtrl($scope, $element, $attrs, $transclude, loadingTopic) {
	$scope.count = 0;
	$scope.isLoading = false;

	loadingTopic.addListener(function(event) {
		if (event == 'startLoading') {
			$scope.count++;
		} else if (event == 'finishLoading') {
			if ($scope.count > 0)
				$scope.count--;
		}
		$scope.isLoading = $scope.count > 0;
	});
};

loadContainerCtrl.$inject = [ '$scope', '$element', '$attrs', '$transclude', 'loadingTopic' ];

angular.module('loader.directives', [ 'messaging' ])

.factory('loadingTopic', [ 'EventDispatcher', function(EventDispatcher) {
	return EventDispatcher.getInstance("loadingTopic");
} ])

.directive('loadContainer', function() {
	return {
		restrict : 'EC',
		transclude : true,
		scope : true,
		templateUrl : '/scripts/templates/load-container.html',
		controller : loadContainerCtrl,
		replace : true
	};
});

function markdownLink($scope, $element, ShowndownConverter) {
  $scope.$watch(function() {
    return $element.html();
  }, function(){
    $element.html(ShowndownConverter($element.html()));        
  });
};

angular.module('markdown.directives', [ 'showndownService' ])

.directive('markdown', ['ShowndownConverter', function (ShowndownConverter){
  return {
    restrict : 'AC',
    link: function ($scope, $element, $attrs) {
      markdownLink($scope, $element, ShowndownConverter);
    }
  };
}]);
