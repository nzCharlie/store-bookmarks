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
      
      #loading {
        /* centering the loading div */
        position: fixed;
        top: 50%;
        margin-top: -22px; /* half of height */ 
        left: 50%;
        margin-left: -125px; /* half of width */
        text-align: center;
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
	  
	  .bookmark-description {
        color: #666666;
        font-family: "Open Sans","Helvetica Neue",Helvetica,Arial,sans-serif;
        font-size: 15px;
        line-height: 21px;
	  }
      
      .control-group.error [class^="icon-"], .control-group.error [class*=" icon-"] {
      	color: #fff;
      }
      
  </style>
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js"></script>
  <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular-resource.min.js"></script>
  <script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.3.0.js"></script>
  <script src="lib/jquery.autosize-min.js"></script>
  <script src="lib/angularjs.messaging-services.min.js"></script>
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

      <!-- Begin page content -->     
      <div id="main">
	      <load-container>
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

