<!doctype html>
<html lang="en" ng-app="bookmarks">
<head>
  <meta charset="utf-8">
  <title>Bookmarks</title>
  <meta name="fragment" content="!" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="//netdna.bootstrapcdn.com/bootswatch/2.3.1/spacelab/bootstrap.min.css" rel="stylesheet">
  <link href="//netdna.bootstrapcdn.com/twitter-bootstrap/2.3.1/css/bootstrap-responsive.min.css" rel="stylesheet">
  <link href="//netdna.bootstrapcdn.com/font-awesome/3.1.1/css/font-awesome.min.css" rel="stylesheet">
  <style>
      /* Sticky footer styles
      -------------------------------------------------- */
      html,
      body {
        height: 100%;
        /* The html and body elements cannot have any padding or margin. */
      }

      /* Wrapper for page content to push down footer */
      #wrap {
        min-height: 100%;
        height: auto !important;
        height: 100%;
        /* Negative indent footer by it's height */
        margin: 0 auto -60px;
      }

      /* Set the fixed height of the footer here */
      #push,
      #footer {
        height: 60px;
      }
      #footer {
        background-color: #f5f5f5;
      }

      /* Lastly, apply responsive CSS fixes as necessary */
      @media (max-width: 767px) {
        #footer {
          margin-left: -20px;
          margin-right: -20px;
          padding-left: 20px;
          padding-right: 20px;
        }
      }

      /* Custom page CSS
      -------------------------------------------------- */
      /* Not required for template or sticky footer method. */
      #main .container {
        padding-top: 60px;
      }
            
      @media (max-width: 979px) {
        #main .container {
          padding-top: 0px;
        }
      } 

      /* centering the loading div */      
      .loading {
        position: fixed;
        top: 50%;
        left: 50%;
        text-align: center;
        z-index: 1100;
      }
      
      #mainLoading .loading {
        margin-top: -22px; /* half of height */
        margin-left: -125px; /* half of width */
      }
      
      .container .credit {
        margin: 20px 0;
      }
      
      .btn-micro {
        padding: 0 3px;
        font-size: 9.75px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
      }
      
      #sort-buttons {
        width: 265px;
      }
      
      @media (max-width: 767px) {
      	#sort-buttons {
          width: 100%;
        }
      }
      
      .bookmark-description-container {
        padding-top: 20px;
      }
      
      .modal {
        width: 850px;
        margin-left: -425px;
      }
      
      .auto-width {
        width: inherit;
      }
      
      .control-group.error [class^="icon-"], .control-group.error [class*=" icon-"] {
      	color: #fff;
      }
      
      #login {
        position: absolute;
        top: 50px;
        background-color: lightgray;
        padding: 10px;
      }

  </style>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.1.5/angular-resource.min.js"></script>
  <script src="//angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.3.0.js"></script>
  <script src="lib/jquery.autosize-min.js"></script>
  <script src="lib/angularjs.messaging-services.min.js"></script>
  <script src="lib/showdown.js"></script>
  <script src="scripts/app.js"></script>
  <script src="scripts/controllers.js"></script>
  <script src="scripts/services.js"></script>
  <script src="scripts/directives.js"></script>
</head>
<body>


    <!-- Part 1: Wrap all page content here -->
    <div id="wrap">

      <!-- Fixed navbar -->
      <menu brand="Bookmarks">
        <nav href="/bookmarks" icon-class="icon-home" title="Home" match-exp="/bookmarks(/.+)?"></nav>
        <nav href="/about" icon-class="icon-user" title="About"></nav>
      </menu>
      
      <div id="login" ng-controller="LoginFormCtrl" >
        <span ng-show="isAuthenticated()"><i class="icon-user"></i></span> {{currentUser}}
        <a class="btn btn-mini" ng-click="toggle()" ng-hide="isAuthenticated()"><i class="icon-user"></i> Login</a>
        <div ng-show="shown">
	<form ng-submit="login()" ng-hide="isAuthenticated()">
	  <div class="control-group">
	    <label class="control-label" for="name">Username:</label>
	    <input name="userInput" class="form-control" type="text" ng-model="userInput" required>
	  </div>
	  <div class="control-group">
	    <label class="control-label" for="name">Password:</label>
	    <input name="password" class="form-control" type="password" ng-model="passwordInput" required>
	  </div>
	  <input class="btn-primary" type="submit" value="Login">
	</form>
        </div>
      </div>

      <!-- Begin page content -->     
      <div id="main">
	      <load-container id='mainLoading'>
	        <div id="app" ng-view></div>
	      </load-container>
      </div>

      <div id="push"></div>
    </div>

    <div id="footer">
      <div class="container">
        <p class="muted credit">Project by <a href="http://nz.linkedin.com/in/charlesjiang/">Charles Jiang</a>.</p>
      </div>
    </div>
    
</body>
</html>

