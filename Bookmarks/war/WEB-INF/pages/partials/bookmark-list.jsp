<div class="container-fluid">
  <div class="row-fluid">
    <div class="span10">
      <!--Body content-->

      <ul class="bookmarks">
        <li ng-repeat="bookmark in bookmarks">
          <a href="{{bookmark.url}}">{{bookmark.description}}</a>
        </li>
      </ul>

    </div>
  </div>
</div>
