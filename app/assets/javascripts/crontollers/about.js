/**
 * Created by jainishshah on 8/8/15.
 */
'use strict';

angular.module('myApp.about', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/about', {
            templateUrl: 'view/about.html',
            controller: 'aboutCtrl'
        });
    }])
    .controller('aboutCtrl', [function($scope,$http) {
        var margin = {top: 40, right: 20, bottom: 100, left: 40},
            width = 960 - margin.left - margin.right,
            height = 600 - margin.top - margin.bottom;

        var formatPercent = d3.format(".0");

        var x = d3.scale.ordinal()
            .rangeRoundBands([0, width], .1);

        var y = d3.scale.linear()
            .range([height, 0]);

        var xAxis = d3.svg.axis()
            .scale(x)
            .orient("bottom");

        var yAxis = d3.svg.axis()
            .scale(y)
            .orient("left")
            .tickFormat(formatPercent);

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) {
                return "<strong>Scale:</strong> <span style='color:red'>" + d.scale + "</span>";
            })

        var svg = d3.select("#project").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        svg.call(tip);

        d3.tsv("assets/javascripts/data.tsv", type, function(error, data) {
            x.domain(data.map(function(d) { return d.skill; }));
            y.domain([0, d3.max(data, function(d) { return d.scale; })]);

            svg.append("g")
                .attr("class", "x axis")
                .attr("transform", "translate(0," + height + ")")
                .style("text-anchor", "end")
                .call(xAxis)
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.18em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)" );

            svg.append("g")
                .attr("class", "y axis")
                .call(yAxis)
                .append("text")
                .attr("transform", "rotate(-90)")
                .attr("y", 4)
                .attr("dy", ".71em")
                .style("text-anchor", "end")
                .text("Scale");

            svg.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", function(d) { return x(d.skill); })
                .attr("width", x.rangeBand())
                .attr("y", function(d) { return y(d.scale); })
                .attr("height", function(d) { return height - y(d.scale); })
                .on('mouseover', tip.show)
                .on('mouseout', tip.hide)

        });

        function type(d) {
            d.scale = +d.scale;
            return d;
        }

    }]);