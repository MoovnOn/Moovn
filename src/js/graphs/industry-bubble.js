d3 = require('d3');
$ = require('jquery');

module.exports = function(svg, state, city, height, width) {
	var counter = function (){
		var k = 0;
		var m = function () {
			k = k + 1;
			return k;
		};

		return m;
	};

	var showText = function (d) {

		if (!this.active) {
			d3.selectAll("circle").attr("active", false);

			d3.select(this).attr("active", true);

			d3.select(".bubble-title").select("span")
				.style("color", this.getAttribute("fill"))
				.text(d.name);
		};

	};

	var bubbleChart = function (data) {

		var data_list = {"name": "Jobs by Industry",
			"children":[]};

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

		var diameter = Math.min(height, width) / 2;
		var color = d3.scale.category20b();

		var bubble = d3.layout.pack()
					.sort(null)
					.size([diameter, diameter])
					.padding(.5);

		//console.log(bubble.nodes(data_list))
		g = svg.append("g")

		var count = counter();
		var count2 = counter();

		var node = g.selectAll(".node")
									.data(bubble.nodes(data_list))
								.enter().append("g")
									.attr("class", "node")
									.attr("transform", function (d) { return "translate(" + d.x +
												"," + d.y + ")";});

		node.append("circle")
				.attr("r", function(d){ return d.r;})
				.attr("class", "circle")
				.attr("active", false)
				.attr("fill", function(d){ return color(d.name);});

		g.attr("transform", "scale(" + 2 + ")");


	};

	Promise.all([

	$.ajax({
		url: "/api/industrysize/" + state + "/" + city + "/"
	}).done(function(d){
		bubbleChart(d);
	}),


]).then(function(results) {

		var circles = d3.selectAll(".circle").on("mouseenter", showText);
		circles.on("touch", showText);

	});

};
