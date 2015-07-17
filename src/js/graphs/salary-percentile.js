var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, job, height, width) {
	$("#boxplot").empty();

	$.ajax({
    method: 'GET',
    url: 'api/salary/' + state + '/' + city + '/' + job
  }).done(function(data){
		if (data !== "no data") {

	  	var values = [data[job+"10th"], data[job+"25th"], data[job+"50th"],
										data[job+"75th"], data[job+"90th"]];


			var svg = d3.select("#boxplot");

			var bp = svg;//.append("g")
			//	.attr("height", svg.attr("height") + "px")
			//	.attr("width", svg.attr("width") + "px");

			//var x = d3.scale.linear()
				//.domain([values[0], values[4]])
				//.range([.05 * bp.attr("width"), .95 * bp.attr("width")]);
			console.log(data)
			console.log(bp.attr("width"))

			var x = function(val) {
				return .05 * bp.attr("width") + .9 * bp.attr("width") *
							 (val - values[0]) / (values[4] - values[0]);
			};

			console.log(x(values[0]))
			console.log(x(values[4]))

				bp.append("line")
					.attr("x1", x(values[0]))
					.attr("x2", x(values[4]))
					.attr("y1", height / 2)
					.attr("y2", height / 2)
					.style({"stroke-width": 2, "stroke": "black"});

				bp.append("line")
					.attr("x1", x(values[0]))
					.attr("x2", x(values[0]))
					.attr("y1", .9 * height / 2)
					.attr("y2", 1.1 * height / 2)
					.style({"stroke-width": 2, "stroke": "black"});

				bp.append("line")
					.attr("x1", x(values[4]))
					.attr("x2", x(values[4]))
					.attr("y1", .9 * height / 2)
					.attr("y2", 1.1 * height / 2)
					.style({"stroke-width": 2, "stroke": "black"});

				bp.append("rect")
					.attr("x", x(values[1]))
					.attr("y", .425 * height)
					.attr("height", .15 * height)
					.attr("width", x(values[2]) - x(values[1]))
					.style({"stroke-width": 2, "stroke": "black", "fill": "green"});

					bp.append("rect")
						.attr("x", x(values[2]))
						.attr("y", .425 * height)
						.attr("height", .15 * height)
						.attr("width", x(values[3]) - x(values[2]))
						.style({"stroke-width": 2, "stroke": "black", "fill": "green"});


					//var g = bp.append("g");

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[0]))
						.attr("y", .3 * height)
						//.attr("lengthAdjust", "spacingAndGlyphs")
						.attr("length", 50)
						.text(values[0]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[1]))
						.attr("y", .75 * height)
						.text(values[1]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[2]))
						.attr("y", .3 * height)
						.text(values[2]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[3]))
						.attr("y", .75 * height)
						.text(values[3]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[4]))
						.attr("y", .3 * height)
						.text(values[4]);

		} else{
			console.log(data)
		}

  });

};
