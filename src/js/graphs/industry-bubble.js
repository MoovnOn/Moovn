d3 = require('d3');
$ = require('jquery');

module.exports = function(svg, state, city) {

	var showText = function (d) {
		console.log(this)
		d3.select("#text" + this.id).attr("opacity", 1);
	};

	var hideText = function () {


	};

	var toggleText = function () {


	};

	var bubbleChart = function (data) {

		var data_list = {"children":[]};

		var cb = function (item, data) {
			obj = {
				"name": item,
				"value": data[item]
			}
			data_list.children.push(obj)
		};

		for (key in data) {
			cb(key, data);
		}

		var diameter = 200;
		var color = d3.scale.category20b();

		var bubble = d3.layout.pack()
					.sort(null)
					.size([diameter, diameter])
					.padding(.5);

		//console.log(bubble.nodes(data_list))
		g = svg.append("g")

		var counter = function (){
			var k = 0;
			var m = function () {
				k = k + 1;
				return k;
			};

			return m;
		};

		var count = counter();
		var count2 = counter();

		var node = g.selectAll(".node")
									.data(bubble.nodes(data_list))
								.enter().append("g")
									.attr("class", "node")
									.attr("transform", function (d) { return "translate(" + d.x + "," +
												d.y + ")";});

		node.append("circle")
				.attr("r", function(d){ return d.r;})
				.attr("class", "circle")
				.attr("id", function(d){
					return count();})
				.attr("fill", function(d){ return color(d.name);});

		var text = node.append("g")
									 .append("text")
		  					 	 .style("text-anchor", "middle")
									 .attr("opacity", 0)
									 .attr("id", function(d){return "text" + count2();})
		  					   .text(function(d){ return d.name;});

		text.attr("transform", function(d){ return "scale(" + 1 / 2 + ")";})

		g.attr("transform", "scale(" + 2 + ")")

	};

	$.ajax({
		url: "/api/industrysize/" + state + "/" + city + "/"
	}).done(function(d){
		bubbleChart(d);
	}).done(function() {
		var circles = d3.selectAll(".circle").on("click", showText);
		// circles.on("mouseenter", showText);
		// circles.on("mouseout", hideText);
	});

};
