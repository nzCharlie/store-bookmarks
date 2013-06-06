<div class="modal-header">
  <h1>{{action}} <i class="icon-refresh icon-spin" ng-show="!isReady"></i></h1>
</div>

<div ng-init="isModal=true" ng-include="'/partials/bookmark-edit-form'"></div>
