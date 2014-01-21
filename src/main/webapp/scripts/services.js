'use strict';

/* Services */

var Listeners = function () {
  var counter = 0;
  var size = 0;
  
  this.listeners = {};
  var self = this;
  
  this.addListeners = function (func) {
    var key = counter + '';
    self.listeners[key] = func;
    counter++;
    
    size++;
    
    return key;
  };

  this.removeListeners = function (key) {
    if (angular.isUndefined(self.listeners[key]))
      return;
    delete self.listeners[key];
    
    size--;
  };
  
  this.size = function () {
    return size;
  };
};

angular.module('bookmarksServices', [ 'ngResource', 'messaging' ])

.factory('Bookmark', 
    [ '$resource', 'EventDispatcher',  function($resource, EventDispatcher) {
      
  var Bookmark = $resource('/rest/bookmarks/:bookmarkId', {bookmarkId : '@id'}, {
    query : {
      method : 'GET',
      params : {
        bookmarkId : 'list'
      },
      isArray : true
    },
    create : {
      method : 'PUT',
      params : {
        bookmarkId : ''
      }
    }
  });
  
  Bookmark.listenerDisabled = false;
  var bookmarkTopic = EventDispatcher.getInstance("bookmarkTopic");
  
  var startListeners = new Listeners();
  var finishListeners = new Listeners();
  
  Bookmark.addStartListener = function (func) {
    return startListeners.addListeners(func);
  };
  Bookmark.removeStartListener = function (key) {
    startListeners.removeListeners(key);
  };
  Bookmark.addFinishListener = function (func) {
    return finishListeners.addListeners(func);
  };
  Bookmark.removeFinishListener = function (key) {
    finishListeners.removeListeners(key);
  };
  
  bookmarkTopic.addListener(function (event, service) {
    if (event == 'start') {
      //console.log('start listener size: ' + startListeners.size());
      angular.forEach(startListeners.listeners, function (value, key) {
        value.call(Bookmark, service);
      });
    }
    else if (event == 'finish') {
      //console.log('finish listener size: ' + finishListeners.size());
      angular.forEach(finishListeners.listeners, function (value, key) {
        value.call(Bookmark, service);
      });
    }
  });

  function topicDispatchEvent(event, service) {
    if (!Bookmark.listenerDisabled) 
      bookmarkTopic.dispatch(event, service);
  };

  function NotifyAdvice(func, service) {
    function topicDispatchFinishEvent() {
      topicDispatchEvent('finish', service);
    };
    
    var returned = function() {
      topicDispatchEvent('start', service);
      var value =  func.apply(Bookmark, arguments);
      value.$then(topicDispatchFinishEvent, topicDispatchFinishEvent);
      return value;
    };
    returned.original = func;
    return returned;
  };
  
  Bookmark['query'] = NotifyAdvice(Bookmark['query'], 'query');
  Bookmark['get'] = NotifyAdvice(Bookmark['get'], 'get');
  Bookmark['create'] = NotifyAdvice(Bookmark['create'], 'create');
  Bookmark['save'] = NotifyAdvice(Bookmark['save'], 'save');
  Bookmark['remove'] = NotifyAdvice(Bookmark['remove'], 'remove');
  Bookmark['delete'] = NotifyAdvice(Bookmark['delete'], 'delete');
  
  return Bookmark;
} ])

.factory('HomeRedirect', ['$location', function ($location){
  return function () {
    $location.path('/bookmarks');
  };
}])

.factory('CancelHomeRedirect', ['HomeRedirect', function (HomeRedirect) {
  return HomeRedirect;
}])
;

angular.module('sessionService', [])
.factory('session', function() {
  var session = {};
  return session;
});

angular.module('showndownService', [])
.factory('ShowndownConverter', function(){
  var showndownConverter = new Showdown.converter();
  return showndownConverter.makeHtml;
});

angular.module('modalWindowDecisionService', []) 
.provider('showModalWindow', function showModalWindowProvider(){
  var maxModalWidth = 750;
  
  this.setMaxModalWidth = function (maxModalWidthToSet) {
    maxModalWidth = maxModalWidthToSet;
  };
  
  this.$get = function () {
    return function () {
      return $(window).width() >= maxModalWidth;
    };
  };
});

angular.module('SecurityService', [])

.factory('authenticationTopic', [ 'EventDispatcher', function(EventDispatcher) {
	return EventDispatcher.getInstance("authenticationTopic");
} ])

.provider('Authentication', function AuthenticationProvider() {
  this.$get = ['$http', 'authenticationTopic', function ($http, authenticationTopic) {
    var user = '';
    return {
      login: function (username, password) {
        user = username;
        authenticationTopic.dispatch('login', user);
      },
      logout: function () {
        authenticationTopic.dispatch('logout', user);
      }
    };
  }];
});
