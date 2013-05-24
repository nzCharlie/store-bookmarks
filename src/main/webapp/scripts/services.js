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
  }
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
  
  bookmarkTopic.addListener(function (event) {
    if (event == 'start') {
      console.log('start listener size: ' + startListeners.size());
      angular.forEach(startListeners.listeners, function (value, key) {
        value.call(Bookmark);
      });
    }
    else if (event == 'finish') {
      console.log('finish listener size: ' + finishListeners.size());
      angular.forEach(finishListeners.listeners, function (value, key) {
        value.call(Bookmark);
      });
    }
  });
  
  var NotifyAdvice = function (func) {
    var topicDispatchEvent = function (event) {
      bookmarkTopic.dispatch(event);
    };
    
    var topicDispatchFinishEvent = function () {
      topicDispatchEvent('finish');
    };
    
    return function() {      
      topicDispatchEvent('start');
      var value =  func.apply(Bookmark, arguments);
      value.$then(topicDispatchFinishEvent, topicDispatchFinishEvent);
      return value;
    };
  };
  
  Bookmark['query'] = NotifyAdvice(Bookmark['query']);
  Bookmark['get'] = NotifyAdvice(Bookmark['get']);
  Bookmark['create'] = NotifyAdvice(Bookmark['create']);
  Bookmark['save'] = NotifyAdvice(Bookmark['save']);
  Bookmark['remove'] = NotifyAdvice(Bookmark['remove']);
  Bookmark['delete'] = NotifyAdvice(Bookmark['delete']);
  
  return Bookmark;
} ]);

angular.module('sessionService', [])
.factory('session', function() {
  var session = {};
  return session;
});
