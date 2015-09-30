/**
 * Created by jainishshah on 8/2/15.
 */
/**
 * Created by jainishshah on 8/2/15.
 */
'use strict';

angular.module('myApp.demo', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/demo', {
            templateUrl: 'view/demo.html',
            controller: 'demoCtrl'
        });
    }])

    .controller('demoCtrl', [function($scope) {
        var margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = 960 - margin.right - margin.left,
            height = 800 - margin.top - margin.bottom;

        var i = 0,
            duration = 750,
            root;

        var tree = d3.layout.tree()
            .size([height, width]);

        var diagonal = d3.svg.diagonal()
            .projection(function(d) { return [d.y, d.x]; });

        var svg = d3.select("#demo").append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        d3.json("assets/javascripts/flare.json", function(error, flare) {
            if (error) throw error;

            root = flare;
            root.x0 = height / 2;
            root.y0 = 0;

            function collapse(d) {
                if (d.children) {
                    d._children = d.children;
                    d._children.forEach(collapse);
                    d.children = null;
                }
            }

            root.children.forEach(collapse);
            update(root);
        });

        d3.select(self.frameElement).style("height", "800px");

        function update(source) {

            // Compute the new tree layout.
            var nodes = tree.nodes(root).reverse(),
                links = tree.links(nodes);

            // Normalize for fixed-depth.
            nodes.forEach(function(d) { d.y = d.depth * 180; });

            // Update the nodes…
            var node = svg.selectAll("g.node")
                .data(nodes, function(d) { return d.id || (d.id = ++i); });

            // Enter any new nodes at the parent's previous position.
            var nodeEnter = node.enter().append("g")
                .attr("class", "node")
                .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
                .on("click", click);

            nodeEnter.append("circle")
                .attr("r", 1e-6)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeEnter.append("text")
                .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
                .attr("dy", ".35em")
                .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
                .text(function(d) { return d.name; })
                .style("fill-opacity", 1e-6);

            // Transition nodes to their new position.
            var nodeUpdate = node.transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

            nodeUpdate.select("circle")
                .attr("r", 4.5)
                .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

            nodeUpdate.select("text")
                .style("fill-opacity", 1);

            // Transition exiting nodes to the parent's new position.
            var nodeExit = node.exit().transition()
                .duration(duration)
                .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
                .remove();

            nodeExit.select("circle")
                .attr("r", 1e-6);

            nodeExit.select("text")
                .style("fill-opacity", 1e-6);

            // Update the links…
            var link = svg.selectAll("path.link")
                .data(links, function(d) { return d.target.id; });

            // Enter any new links at the parent's previous position.
            link.enter().insert("path", "g")
                .attr("class", "link")
                .attr("d", function(d) {
                    var o = {x: source.x0, y: source.y0};
                    return diagonal({source: o, target: o});
                });

            // Transition links to their new position.
            link.transition()
                .duration(duration)
                .attr("d", diagonal);

            // Transition exiting nodes to the parent's new position.
            link.exit().transition()
                .duration(duration)
                .attr("d", function(d) {
                    var o = {x: source.x, y: source.y};
                    return diagonal({source: o, target: o});
                })
                .remove();

            // Stash the old positions for transition.
            nodes.forEach(function(d) {
                d.x0 = d.x;
                d.y0 = d.y;
            });
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }

        var data = [{
            value: 30,
            color: "#F7464A",
            label: "Programming"
        }, {
            value: 50,
            color: "#E2EAE9",
            label: "Scripting"
        }, {
            value: 100,
            color: "#D4CCC5",
            label: "Docker"
        }, {
            value: 40,
            color: "#949FB1",
            label: "Front-End"
        }, {
            value: 120,
            color: "#4D5360",
            label: "AWS"
        }

        ]

        var options = {
            animation: true
        };

        //Get the context of the canvas element we want to select
        var c = $('#myChart');
        var ct = c.get(0).getContext('2d');
        var ctx = document.getElementById("myChart").getContext("2d");
        /*************************************************************************/
        new Chart(ct).Doughnut(data, options);


        var barData = {
            labels: ['HTML', 'CSS', 'JavaScript', 'jQuery', 'Json', 'AngularJs','Node.js'],
            datasets: [
                {
                    label: 'learned',
                    fillColor: '#382765',
                    data: [8, 9, 9, 5, 8, 8]
                },
                {
                    label: 'work',
                    fillColor: '#7BC225',
                    data: [6, 5, 7, 2, 5, 4]
                }
            ]
        };

        var context = document.getElementById('clients').getContext('2d');
        var clientsChart = new Chart(context).Bar(barData);


    }]);

