/**
 * Created by jainishshah on 8/8/15.
 */
'use strict';

angular.module('myApp.about', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'view1/about.html',
            controller: 'aboutCtrl'
        });
    }])
    .controller('aboutCtrl', [function($scope,$http) {

    }]);