<div class="container">
  <div class="page-header">
    <h1>Bookmarks <a class="btn btn-mini" href="#/bookmarks/add"><i class="icon-bookmark-empty"></i> Add</a>
    </h1>
  </div>

  <div class="row-fluid">
    <div class="span10">
      <!--Body content-->

      <ul class="bookmarks icons-ul">
        <li ng-repeat="bookmark in bookmarks">
          <i class="icon-li icon-bookmark"></i> <a href="{{bookmark.url}}">{{bookmark.description}}</a>
        </li>
      </ul>

    </div>
  </div>
</div>
