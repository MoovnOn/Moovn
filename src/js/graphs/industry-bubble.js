d3 = require('d3');
$ = require('jquery');

module.exports = function(svg, state, city, height, width) {

	var boundTo = ".tri-2"; // d3-selector for element the list is appended to

	// styling for the bubble chart and list elements
	var listBackgroundColor = "white";
	var listHighlightColor = "lightgrey";
	var circleStrokeWidth = 3;
	var circleHighlightColor = "white";


	// closure for generating element IDs
	var counter = function (){
		var k = 0;
		var m = function () {
			k = k + 1;
			return k;
		};

		return m;
	};

	// var div = d3.select(".bubble-title").insert("div")
	// 	.attr("class", "tooltip")
	// 	.style({"opacity": 1e-6,
	// 		"width": "100px",
	// 		"height": "auto",
	// 		"text-align": "left",
	// 		"padding": "8px",
	// 		"pointer-events": "none"
	// 	});

	/**
		function to highlight descriptive list items corresponding to circles
		on mouse-enter
	**/
	var showText = function (d) {

		if (!this.active) {
			d3.selectAll("circle").attr("active", false)
				.style("stroke", "none");
			$(".job").css("background-color", listBackgroundColor);
			d3.select(this).attr("active", true)
				.style("stroke", circleHighlightColor);
			$("#" + "L" + this.id).css("background-color", listHighlightColor);


			// currently unused tooltips for the bubble chart

			// d3.select(".tooltip")
			// 	.style({"left": d3.event.pageX + "px",
			// 		"top": d3.event.pageY + "px",
			// 		"opacity": 1})
			// 	.text(d.name);

			// d3.select(".bubble-title").select("span")
			// 	.style("color", this.getAttribute("fill"))
			// 	.text(d.name);
		}

	};

	/**
		function for highlighting circles corresponding to list items
		on mouse-enter
	**/
	var showCircle = function (d) {

		if(!this.active){

			d3.selectAll("circle").attr("active", false)
				.style("stroke", "none");
			$("#" + this.id.slice(1)).css("stroke", circleHighlightColor);

			d3.selectAll(".job").style("background-color", listBackgroundColor)
			$("#" + this.id).css("background-color", listHighlightColor);

		}

	};


	/**
		function to create bubble chart from industry job data
	**/
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

		// var entries = data_list.children.sort(function(a, b){
		// 	return b["value"] - a["value"];
		// });

		// adding the job list to the page
		var jobList = d3.select(boundTo)//.append("div")
			.append("ul").attr("class", "jobList pure-u-1-2");

		// for (var i = 0; i < entries.length; i++) {
		// 	jobList.append("li")
		// 		.attr("class", "job")
		// 		.text(entries[i]["name"] + ": " + entries[i]["value"] + "%")
		// }


		//bubble size and color generators
		var diameter = Math.min(height, width) / 2;
		var color = d3.scale.category20b();

		// bubble layout
		var bubble = d3.layout.pack()
			.sort(null)
			.size([diameter, diameter])
			.padding(circleStrokeWidth / 2);

		//console.log(bubble.nodes(data_list))
		g = svg.append("g")

		// synced ID generators
		var count = counter();
		var count2 = counter();

		// the data set with bubble positions
		bubbles = bubble.nodes(data_list)

		// nodes with positions for the circles
		var node = g.selectAll(".node")
				.data(bubbles)
			.enter().append("g")
				.attr("class", "node")
				.attr("transform", function (d) { return "translate(" + d.x +
							"," + d.y + ")";});

		// create the circles
		node.append("circle")
				.attr("r", function(d){ return d.r;})
				.attr("class", "circle")
				.attr("active", false)
				.style("stroke-width", circleStrokeWidth)
				.attr("id", function(d){ return count();})
				.attr("fill", function(d){ return color(d.name);});

		// fill the svg
		g.attr("transform", "scale(" + 4 + ")");

		// create list items
		jobList.selectAll("li")
			.data(bubbles)
		.enter().append("li")
			.attr("class", "job")
			.attr("id", function(d){ return "L" + count2();})
			.style({"color": function(d){ return color(d.name);},
							"background-color": listBackgroundColor})
			.text(function(d){ return d.name + ": " + Math.round((d.value + .00001) * 100) / 100 + "%";});

	};

	/**
		ajax request to load the data, then select items
		for mouse and touch events
	**/
	Promise.all([

	$.ajax({
		url: "/api/industrysize/" + state + "/" + city + "/"
	}).done(function(d){
		bubbleChart(d);
		$(".job").first().css("display", "none"); // drop total from list
	}),


]).then(function(results) {

		var circles = d3.selectAll(".circle").on("mouseenter", showText);
		circles.on("touch", showText);

		var legend = d3.selectAll(".job").on("mouseenter", showCircle);
		legend.on("touch", showCircle);

	});

};
