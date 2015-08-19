'use strict';

angular.module('myApp.home', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/home', {
            templateUrl: 'view/home.html',
            controller: 'homeCtrl'
        });
    }])

    .controller('homeCtrl', [function($scope,$http) {

    }]);

