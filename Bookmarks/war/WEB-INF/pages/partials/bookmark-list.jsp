<div class="container">
  <div class="page-header row">
    <h1>
    	<span class="span8">
    		Bookmarks 
    		<a class="btn btn-mini" href="#/bookmarks/add"><i class="icon-bookmark-empty"></i> Add</a>
		</span>
	</h1>
			<div class="btn-group">
  			<button type="button" class="btn btn-mini" ng-model="sortSelection" btn-radio="'name'">Sorted by name</button>
  			<button type="button" class="btn btn-mini" ng-model="sortSelection" btn-radio="'updated'">Sorted by date</button>
		</div>
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
    		<tr ng-repeat="bookmark in bookmarks | orderBy:sortSelection">
      			<td><i class="icon-li icon-bookmark"></i> <a href="{{bookmark.url}}">{{bookmark.name}}</a> 
      			- <a class="btn btn-mini" href="#/bookmarks/edit/{{bookmark.id}}"><i class="icon-edit"></i></a>
						|  <a class="btn btn-mini" ng-click="deleteBookmark(bookmark)"><i class="icon-trash"></i></a>
          		</td>
		    </tr>
		</tbody>
	  </table>

    </div>
  </div>
</div>
