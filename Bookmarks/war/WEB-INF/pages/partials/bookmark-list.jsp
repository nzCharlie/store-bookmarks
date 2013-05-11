<div class="container">
  <div class="page-header">
    <h1>Bookmarks <a class="btn btn-mini" href="#/bookmarks/add"><i class="icon-bookmark-empty"></i> Add</a>
    </h1>
  </div>

  <div class="row-fluid">
    <div class="span10">
      <!--Body content-->

	  <p ng-hide="bookmarks.length > 0">
	  Looks like you have have any bookmark saved. 
	  Do you want to <a class="btn btn-mini" href="#/bookmarks/add"><i class="icon-bookmark-empty"></i> Add</a> one?
	  </p>
	  
	  <table class="table table-hover" ng-show="bookmarks.length > 0">
	  	<tbody>
    		<tr ng-repeat="bookmark in bookmarks">
      			<td><i class="icon-li icon-bookmark"></i> <a href="{{bookmark.url}}">{{bookmark.name}}</a></td>
      			<td>
						<a href="#/bookmarks/edit/{{bookmark.id}}"><i class="icon-edit"></i></a>
						|  <a ng-click="deleteBookmark(bookmark)"><i class="icon-trash"></i></a>
          		</td>
		    </tr>
		</tbody>
	  </table>

    </div>
  </div>
</div>
