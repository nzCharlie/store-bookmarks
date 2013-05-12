<div class="container">
  <div class="page-header row-fluid">
    <h1 class="span5">
    		Bookmarks 
    		<a class="btn btn-mini btn-primary" href="#/bookmarks/add" ><i class="icon-bookmark-empty"></i> Add</a>
	</h1>
	<div class="pull-right" id="sortButtons">
		<div class="well well-small">
			<div class="btn-toolbar">
				<div class="text-right">			
					<div class="btn-group">
						<button type="button" class="btn btn-mini" ng-model="sortSelection" btn-radio="'name'"><i class="icon-bookmark"></i> Sort by name</button>
						<button type="button" class="btn btn-mini" ng-model="sortSelection" btn-radio="'updated'"><i class="icon-calendar"></i> Sort by date</button>
					</div>
					<div class="btn-group">
						<button type="button" class="btn btn-mini" ng-model="isAscendingSort" btn-checkbox>
							<i ng-class="sortDirectionIconClass"></i> {{isAscendingSort && 'Asc' || 'Desc'}}
						</button>
					</div>
				</div>
			</div>
		</div>
	</div>
  </div>

  <div class="row-fluid">
    <div class="span12">
      <!--Body content-->

	  <p ng-hide="bookmarks.length > 0">
	  Looks like you have have any bookmark saved. 
	  Do you want to <a class="btn btn-mini btn-primary" href="#/bookmarks/add"><i class="icon-bookmark-empty"></i> Add</a> one?
	  </p>
	  
	  <table class="table table-hover" ng-show="bookmarks.length > 0">
	  	<tbody>
    		<tr ng-repeat="bookmark in bookmarks | orderBy:sort">
      			<td><i class="icon-bookmark icon-2x"></i> <a href="{{bookmark.url}}"><strong>{{bookmark.name}}</strong></a></td>
      			<td>
      				<span class="pull-right">
      					<a class="btn btn-mini btn-primary" href="#/bookmarks/edit/{{bookmark.id}}"><i class="icon-edit"></i> Edit</a>
						|  <a class="btn btn-mini btn-danger" ng-click="deleteBookmark(bookmark)"><i class="icon-trash"> Delete</i></a>
					</span>
				</td>
		    </tr>
		</tbody>
	  </table>

    </div>
  </div>
</div>
