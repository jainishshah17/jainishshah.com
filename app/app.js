'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view',
  'myApp.view2',
  'myApp.home',
  'myApp.contact',
  'myApp.about',
  'myApp.projects',
  'myApp.demo',
  'myApp.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view'});
}]);
