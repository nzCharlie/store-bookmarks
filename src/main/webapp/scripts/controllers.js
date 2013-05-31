'use strict';

/* Controllers */

angular.module('bookmarksCtrl', [ 'bookmarksServices', 'sessionService', 'ui.directives', 'loader.directives', 'modalWindowDecisionService' ])

.controller('BookmarksListCtrl', 
  [ '$scope', 'Bookmark', 'session', '$dialog', '$location', 'showModalWindow',  function($scope, Bookmark, session, $dialog, $location, showModalWindow) {
  Bookmark.listenerDisabled = false; // always enables listeners (for loading screen)
    
  $scope.isAscendingSort = angular.isUndefined(session.isAscendingSort) ? true : session.isAscendingSort;
  $scope.sortSelection = angular.isUndefined(session.sortSelection) ? 'name' : session.sortSelection;

  function updateSortOrder() {
    session.sortSelection = $scope.sortSelection;
    session.isAscendingSort = $scope.isAscendingSort;

    var sortPrefix = !$scope.isAscendingSort ? '-' : '';
    $scope.sortDirectionIconClass = !$scope.isAscendingSort ? 'icon-arrow-down' : 'icon-arrow-up';
    $scope.sort = sortPrefix + $scope.sortSelection;
  };

  $scope.$watch('sortSelection', updateSortOrder);
  $scope.$watch('isAscendingSort', updateSortOrder);
  updateSortOrder();

  function load() {
    $scope.bookmarks = Bookmark.query({});
  };

  $scope.deleteBookmark = function(bookmark) {
    bookmark.$delete({
      bookmarkId : bookmark.id
    }, load);
  };

  load();

  $scope.hasDescription = function(bookmark) {
    return $.trim(bookmark.description).length > 0;
  };

  $scope.addBookmark = function () {
    if (showModalWindow()) {
      openModal('Add');
    }
    else {
      $location.path('/bookmarks/add');
    }
  };
  
  $scope.editBookmark = function (id) {
    if (showModalWindow()) {
      openModal('Edit', id);
    }
    else {
      $location.path('/bookmarks/edit/' + id);
    }
  };
  
  var opts = {
      backdrop: true,
      keyboard: true,
      backdropClick: false,
  };
  function openModal(action, id) {
    opts.resolve = {
        'action' : function () { return action; },
        'bookmark': function () { 
          if (action == 'Edit') {
            var bookmark = Bookmark.get({
              bookmarkId : id
            });
            return bookmark;
          }
        }
    };
    var dialog = $dialog.dialog(opts);
    dialog.open('/partials/bookmark-detail-modal', 'BookmarkDetailModalCtrl');
  };
  
} ])

.controller('BookmarkDetailModalCtrl', ['$scope', 'dialog', 'action', 'bookmark', function($scope, dialog, action, bookmark){
  $scope.action = action;
  $scope.isReady = false;
  
  if (action == 'Edit') {
    bookmark.$then(function () {
      $scope.name = bookmark.name;
      $scope.url = bookmark.url;
      $scope.description = bookmark.description;
      
      $scope.isReady = true;
    });
  }
  else {
    $scope.isReady = true;    
  }

  $scope.$on('submit', function (event, bookmark){
    dialog.close(bookmark);
  });
  $scope.$on('canceled', function (event){
    dialog.close();
  });
}])

.controller('BookmarkAddCtrl', 
  [ '$scope', 'Bookmark', 'HomeRedirectService', function($scope, Bookmark, HomeRedirectService) {
      
  $scope.action = 'Add';
  Bookmark.listenerDisabled = true;
  $scope.isReady = true;

  $scope.$on('submit', function(event, bookmark) {
    console.log("received" + bookmark);

    $scope.$broadcast('saving');

    Bookmark.create(bookmark, function() {
      $scope.$broadcast('saved');
      HomeRedirectService();
    });
  });
  
  $scope.$on('canceled', HomeRedirectService);
} ])

.controller('BookmarkEditCtrl', 
  [ '$scope', 'Bookmark', '$routeParams', 'HomeRedirectService', function($scope, Bookmark, $routeParams, HomeRedirectService) {
    
  $scope.action = 'Edit';
  $scope.isReady = false;

  var bookmark = Bookmark.get({
    bookmarkId : $routeParams.bookmarkId
  }, function() {
    $scope.name = bookmark.name;
    $scope.url = bookmark.url;
    $scope.description = bookmark.description;
    
    $scope.isReady = true;
  });
  
  var handle = Bookmark.addFinishListener(function (){
    Bookmark.listenerDisabled = true;
    Bookmark.removeFinishListener(handle); // ensure this listener only get called once.
  });

  $scope.$on('submit', function(event, updatedBookmark) {
    console.log("received" + updatedBookmark);

    $scope.$broadcast('saving');

    bookmark.name = updatedBookmark.name;
    bookmark.url = updatedBookmark.url;
    bookmark.description = updatedBookmark.description;

    console.log('updating bookmark id: ' + bookmark.id);
    bookmark.$save({
      bookmarkId : ''
    }, function() {
      $scope.$broadcast('saved');
      HomeRedirectService();
    });
  });
  
  $scope.$on('canceled', HomeRedirectService);
} ])

.controller('BookmarkFormCtrl', 
  [ '$scope', function($scope) {
  $scope.isSaving = false;
  
  $scope.submit = function() {
    var bookmark = {
    "name" : $.trim($scope.name),
    "url" : $scope.url,
    "description" : $.trim($scope.description)
    };
    console.log(bookmark);

    $scope.$emit('submit', bookmark);
    console.log("submit" + bookmark);
  };
  
  $scope.canceling = function () {
    $scope.$emit('canceled');
  };

  $scope.$on('saving', function() {
    $scope.isSaving = true;
  });
  $scope.$on('saved', function() {
    $scope.isSaving = false;
  });
} ]);
