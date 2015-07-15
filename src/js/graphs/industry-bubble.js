d3 = require('d3');
$ = require('jquery');

module.exports = function(svg, state, city) {

	$.ajax({
		url: "/api/industrysize/" + state + "/" + city + "/"
	}).done(function(d){
		//console.log(d);
		bubbleChart(d);
	});

	var bubbleChart = function (data) {
		//console.log("data");
		//console.log(data);

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

		console.log(svg)
		var diameter = Math.min(svg.attr("height"),svg.attr("width")) / 2;
		console.log(diameter)
		var color = d3.scale.category20b();

		var bubble = d3.layout.pack()
					.sort(null)
					.size([diameter, diameter])
					.padding(.5);

		console.log(bubble.nodes(data_list))
		g = svg.append("g")
		var node = g.selectAll(".node")
									.data(bubble.nodes(data_list))
								.enter().append("g")
									.attr("class", "node")
									.attr("transform", function (d) { return "translate(" + d.x + "," +
												d.y + ")";});

		node.append("circle")
				.attr("r", function(d){ return d.r;})
				.attr("fill", function(d){ return color(d.name);});


		var text = node.append("g")
									 .append("text")
		  					 	 .style("text-anchor", "middle")
		  					   .text(function(d){ return d.name;});

		text.attr("transform", function(d){ return "scale(" + 1/2  + ")";})

		g.attr("transform", "scale(" + 2 + ")")

	};

};
