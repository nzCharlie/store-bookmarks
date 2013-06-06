'use strict';

/* Controllers */

angular.module('bookmarksCtrl', [ 'bookmarksServices', 'sessionService', 'ui.directives', 'loader.directives', 'modalWindowDecisionService' ])

.controller('BookmarksListCtrl', 
  [ '$scope', 'Bookmark', 'session', '$dialog', '$location', 'showModalWindow',  function($scope, Bookmark, session, $dialog, $location, showModalWindow) {
    
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
    return $scope.bookmarks = Bookmark.query({});
  };
  
  $scope.deleteBookmark = function(bookmark) {
    var msgbox = $dialog.messageBox('Delete Bookmark', 'Are you sure you want to delete ' + bookmark.name + '?', 
        [{label: 'Yes', result: 'yes'}, {label: 'No', result: 'no', cssClass: 'btn-primary'}]);
    
    msgbox.open().then(function (result){
      if (result == 'yes') {
        bookmark.$delete({
          bookmarkId : bookmark.id
        }, load);        
      }
    });
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
        // overriding id resolution
        'bookmarkId' : function () { 
          return id; 
        },
        // overriding the default HomeRedirect service with our own...
        'HomeRedirect': function () {
          return function () {           
            dialog.close();
            load();
          };
        },
        'CancelHomeRedirect': function () {
          return function () {
            dialog.close();
          };
        }       
    };
    var dialog = $dialog.dialog(opts);
    
    var controller = '';
    if (action == 'Add') {
      controller = 'BookmarkAddCtrl';
    }
    else if (action == 'Edit') {
      controller = 'BookmarkEditCtrl';
    }
    
    dialog.open('/partials/bookmark-detail-modal', controller);
  };
  
} ])

.controller('BookmarkAddCtrl', 
  [ '$scope', 'Bookmark', 'HomeRedirect', 'CancelHomeRedirect', function($scope, Bookmark, HomeRedirect, CancelHomeRedirect) {
      
  $scope.action = 'Add';
  $scope.isReady = true;

  $scope.$on('submit', function(event, bookmark) {
    console.log("received" + bookmark);

    $scope.$broadcast('saving');

    Bookmark.create(bookmark).$then(function() {
      $scope.$broadcast('saved');
      HomeRedirect(bookmark);
    });
  });
  
  $scope.$on('canceled', function () {
    if ($scope.isReady) {
      CancelHomeRedirect();
    }
  });
} ])

.controller('BookmarkEditCtrl', 
  [ '$scope', 'Bookmark', 'bookmarkId', 'HomeRedirect', 'CancelHomeRedirect', function($scope, Bookmark, bookmarkId, HomeRedirect, CancelHomeRedirect) {
    
  $scope.action = 'Edit';
  $scope.isReady = false;

  var bookmark = Bookmark.get({
    'bookmarkId' : bookmarkId
  }, function() {
    $scope.name = bookmark.name;
    $scope.url = bookmark.url;
    $scope.description = bookmark.description;
    
    $scope.isReady = true;
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
    }).$then(function() {
      $scope.$broadcast('saved');
      HomeRedirect(bookmark);
    });
  });
  
  $scope.$on('canceled', function () {
    if ($scope.isReady) {
      CancelHomeRedirect();
    }
  });
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
