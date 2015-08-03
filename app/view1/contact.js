/**
 * Created by jainishshah on 8/2/15.
 */
'use strict';

angular.module('myApp.contact', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/contact', {
            templateUrl: 'view1/contact.html',
            controller: 'contactCtrl'
        });
    }])

    .controller('contactCtrl', [function($scope) {
        var myCenter=new google.maps.LatLng(37.543196, -121.976410);
        //var myCenter=new google.maps.LatLng(51.508742,-0.120850);

        function initialize()
        {
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
        }

        google.maps.event.addDomListener(window, 'load', initialize);

    }]);

