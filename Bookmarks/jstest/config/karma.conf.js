basePath = '../';

files = [
  JASMINE,
  JASMINE_ADAPTER,
  'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular.min.js',
  'http://ajax.googleapis.com/ajax/libs/angularjs/1.0.6/angular-resource.min.js',
  'test/lib/angular/angular-mocks.js',
  'js/**/*.js',
  'test/unit/**/*.js'
];

autoWatch = true;

browsers = ['Firefox'];

junitReporter = {
  outputFile: 'test_out/unit.xml',
  suite: 'unit'
};
