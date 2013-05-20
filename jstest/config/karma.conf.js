frameworks = ["jasmine"];

plugins = [
   'karma-jasmine',
   'karma-coverage',
   'karma-phantomjs-launcher'
 ];

basePath = '../';

files = [
  'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js',
  'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular-resource.min.js',
  'http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js',
  'test/lib/angular/angular-mocks.js',
  '../src/main/webapp/scripts/**/*.js',
  'test/unit/**/*.js'
];

preprocessors = {
  '../src/main/webapp/scripts/*.js': 'coverage'
};

autoWatch = true;

browsers = ['PhantomJS'];

reporters = ['coverage'];