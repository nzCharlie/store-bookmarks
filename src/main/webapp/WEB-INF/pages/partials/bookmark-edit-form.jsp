<form name="bookmarkForm" class="form-horizontal" ng-submit="submit()" ng-controller="BookmarkFormCtrl">
  <div ng-class="{'modal-body': isModal}">
	  <div class="control-group" ng-class="{error: bookmarkForm.name.$invalid}">
	    <label class="control-label" for="name">Name:</label>
	      <div class="controls">
	      <div class="input-prepend">
	        <span class="add-on"><i class="icon-bookmark"></i></span>
	        <input name="name" class="input-xxlarge" type="text"
	          ng-model="name" required ng-disabled="!isReady"
	          placeholder="Name of the bookmark">
	      </div>
	      <span class="error" ng-show="bookmarkForm.name.$error.required" class="help-inline">Required</span>
	      </div>
	  </div>
	  
	  <div class="control-group" ng-class="{error: bookmarkForm.url.$invalid}">
	    <label class="control-label" for="url">Location (URL):</label>
	      <div class="controls">
	        <div class="input-prepend">
	          <span class="add-on"><i class="icon-globe"></i></span>
	        <input name="url" class="input-xxlarge" type="url" 
	          ng-model="url" required ng-disabled="!isReady"
	          placeholder="URL of the bookmark, e.g. http://www.google.com">
	      </div>
	      <span class="error" ng-show="bookmarkForm.url.$error.required" class="help-inline">Required</span>
	      <span class="error" ng-show="bookmarkForm.url.$error.url" class="help-inline">Invalid URL</span>
	      </div>
	  </div>
	  
	  <div class="control-group">
	    <label class="control-label" for="description">Note:</label>
	      <div class="controls">
	        <div class="input-prepend">
	          <span class="add-on"><i class="icon-edit"></i></span>
	          <!-- TODO add markdown favoured editor -->
	        <textarea name="description" class="input-xxlarge" 
	          ng-model="description" placeholder="Note for the bookmark" rows="1"
	          auto-grow ng-disabled="!isReady"></textarea>
	      </div>
	      </div>
	  </div>
  </div>

  <div ng-class="{'modal-footer': isModal}">
	  <div class="control-group">
	      <div class="controls">
	      <button type="submit" class="btn btn-primary" ng-disabled="!isReady || isSaving || bookmarkForm.$invalid">
	         <i class="icon-refresh icon-spin" ng-show="isSaving"></i>
	         <i class="icon-save" ng-show="!isSaving"></i>
	         Save
	      </button>
	      <a class="btn cancel" ng-click="canceling()" ng-disabled="!isReady|| isSaving">Cancel</a>
	    </div>
	  </div>
  </div>
</form>