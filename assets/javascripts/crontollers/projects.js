/**
 * Created by jainishshah on 8/8/15.
 */
/**
 * Created by jainishshah on 8/8/15.
 */
'use strict';

angular.module('myApp.projects', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/projects', {
            templateUrl: 'view/projects.html',
            controller: 'projectsCtrl'
        });
    }])
    .controller('projectsCtrl', [function($scope,$http) {


    }]);