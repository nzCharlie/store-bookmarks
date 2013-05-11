<!doctype html>
<html lang="en" ng-app="bookmarks">
<head>
  <meta charset="utf-8">
  <title>Bookmarks</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="styles/bootstrap.min.css">
  <link rel="stylesheet" href="styles/bootstrap-responsive.min.css" >
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
      .container .credit {
        margin: 20px 0;
      }

      code {
        font-size: 80%;
      }
  </style>
  <script src="lib/angular/angular.min.js"></script>
  <script src="http://angular-ui.github.io/bootstrap/ui-bootstrap-tpls-0.3.0.js"></script>
  <script src="scripts/app.js"></script>
  <script src="scripts/controllers.js"></script>
  <script src="scripts/services.js"></script>
  <script src="lib/angular/angular-resource.min.js"></script>
</head>
<body>


    <!-- Part 1: Wrap all page content here -->
    <div id="wrap">

      <!-- Fixed navbar -->
      <div class="navbar navbar-fixed-top">
        <div class="navbar-inner" ng-controller="CollapseCtrl">
          <div class="container">
            <button type="button" class="btn btn-navbar" ng-click="isCollapsed = !isCollapsed">
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
              <span class="icon-bar"></span>
            </button>
            <a class="brand" href="#">Bookmarks</a>
            <div class="nav-collapse collapse" collapse="isCollapsed">
              <ul class="nav">
                <li class="active"><a href="#">Home</a></li>
                <li><a href="#about">About</a></li>
              </ul>
            </div><!--/.nav-collapse -->
          </div>
        </div>
      </div>

      <!-- Begin page content -->
      <div id="main" ng-view></div>

      <div id="push"></div>
    </div>

    <div id="footer">
      <div class="container">
        <p class="muted credit">
        	Project by <a href="http://nz.linkedin.com/in/charlesjiang/">Charles Jiang</a>, designed based on <a href="http://twitter.github.io/bootstrap/examples/sticky-footer-navbar.html">Bootstrap example</a>.
        </p>
      </div>
    </div>
    
</body>
</html>

