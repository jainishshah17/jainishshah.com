/**
 * Created by jainishshah on 8/2/15.
 */
'use strict';

angular.module('myApp.contact', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'view/contact.html',
            controller: 'contactCtrl'
        });
    }])

    .controller('contactCtrl',['$scope','$http', function($scope, $http) {

        $scope.result = 'hidden'
        $scope.resultMessage;
        $scope.formData; //formData is an object holding the name, email, subject, and message
        $scope.submitButtonDisabled = false;
        $scope.submitted = false; //used so that form errors are shown only after the form has been submitted
        $scope.submit = function(contactform) {
            $scope.submitted = true;
            $scope.submitButtonDisabled = true;
            if (contactform.$valid) {
                $http({
                    method  : 'POST',
                    url     : 'http://localhost:8000/contact-form.php',
                    data    : $.param($scope.formData),  //param method from jQuery
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  //set the headers so angular passing info as form data (not request payload)
                }).success(function(data){
                    console.log(data);
                    if (data) { //success comes from the return json object
                        $scope.submitButtonDisabled = true;
                        $scope.resultMessage = data;
                        $scope.result='bg-success';
                    } else {
                        $scope.submitButtonDisabled = false;
                        $scope.resultMessage = data;
                        $scope.result='bg-danger';
                    }
                });
            } else {
                $scope.submitButtonDisabled = false;
                $scope.resultMessage = 'Failed <img src="http://www.chaosm.net/blog/wp-includes/images/smilies/icon_sad.gif" alt=":(" class="wp-smiley">  Please fill out all the fields.';
                $scope.result='bg-danger';
            }
        };

        var myCenter=new google.maps.LatLng(37.543196, -121.976410);

            var mapProp = {
                center:myCenter,
                zoom:5,
                mapTypeId:google.maps.MapTypeId.ROADMAP
            };

            var map=new google.maps.Map(document.getElementById("map"),mapProp);

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
    }]);

