<div class="container">
	<div class="page-header">
		<h1>Add your bookmark</h1>
	</div>

	<form class="form-horizontal">
		<div class="control-group">
			<label class="control-label" for="name">Name:</label>
    		<div class="controls">
				<div class="input-prepend">
					<span class="add-on"><i class="icon-bookmark"></i></span>
					<input class="input-xxlarge" type="text" id="name" placeholder="Name of the bookmark">
				</div>
    		</div>
		</div>
		
		<div class="control-group">
			<label class="control-label" for="url">Location (URL):</label>
    		<div class="controls">
    			<div class="input-prepend">
    				<span class="add-on"><i class="icon-globe"></i></span>
					<input class="input-xxlarge" type="text" id="url" placeholder="URL of the bookmark, e.g. http://www.google.com">
				</div>
    		</div>
		</div>
		
		<div class="control-group">
			<label class="control-label" for="description">Note:</label>
    		<div class="controls">
    			<div class="input-prepend">
    				<span class="add-on"><i class="icon-edit"></i></span>
					<textarea class="input-xxlarge" id="description" placeholder="Leave some note for the bookmark" rows="1"></textarea>
				</div>
    		</div>
		</div>

		<div class="control-group">
		    <div class="controls">
				<button type="submit" class="btn btn-primary">Save</button>
				<a class="btn" href="#/bookmarks">Cancel</a>
			</div>
		</div>
	</form>
</div>