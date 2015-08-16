/**
 * Created by jainishshah on 8/2/15.
 */
'use strict';

angular.module('myApp.contact', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: '/app/view/contact.html',
            controller: 'contactCtrl'
        });
    }])

    .controller('contactCtrl', [function($scope, $http) {


        var myCenter=new google.maps.LatLng(37.543196, -121.976410);

            var mapProp = {
                center:myCenter,
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };

            var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

            var marker=new google.maps.Marker({
                position:myCenter,
            });

            marker.setMap(map);

            var infowindow = new google.maps.InfoWindow({
                content:"39800 Fremont Blvd #206, Fremont ,CA-94538"
            });

            google.maps.event.addListener(marker, 'click', function() {
                infowindow.open(map,marker);
            });

        google.maps.event.addDomListener(window, 'load');

        //$scope.success = false;
        //$scope.error = false;
        //$scope.send = function () {
        //
        //    var htmlBody = '<div>Name: ' + $scope.user.name + '</div>' +
        //        '<div>Email: ' + $scope.user.email + '</div>' +
        //        '<div>Message: ' + $scope.user.body + '</div>' +
        //        '<div>Date: ' + (new Date()).toString() + '</div>';
        //
        //    $http({
        //        url: 'https://api.postmarkapp.com/email',
        //        method: 'POST',
        //        data: {
        //            'From': 'foo@foo.com',
        //            'To': 'bar@bar.com',
        //            'HtmlBody': htmlBody,
        //            'Subject': 'New Contact Form Submission'
        //        },
        //        headers: {
        //            'Accept': 'application/json',
        //            'Content-Type': 'application/json',
        //            'X-Postmark-Server-Token': '8569dcd45-6a1a-4e7b-ae75-ea37629de4'
        //        }
        //    }).success(function (data) {
        //            $scope.success = true;
        //            $scope.user = {};
        //        }).error(function (data) {
        //            $scope.error = true;
        //        });
        //}

    }]);

