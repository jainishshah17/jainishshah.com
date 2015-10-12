/**
 * Created by jainishshah on 8/2/15.
 */
/**
 * Created by jainishshah on 8/2/15.
 */
'use strict';

angular.module('myApp.dockers', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dockers', {
            templateUrl: 'view/dockers.html',
            controller: 'dockersCtrl'
        });
    }])

    .controller('dockersCtrl', [function($scope) {

    }]);

