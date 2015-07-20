var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, job, height, width) {
	$("#boxplot").empty();
	$.ajax({
    method: 'GET',
    url: 'api/salary/' + state + '/' + city + '/' + job + '/'
  }).done(function(data){
		d3.select(".tri-1").select("h3").remove();
		$("#boxplot").empty();

  	var values = [data[job+"10th"], data[job+"25th"], data[job+"50th"],
									data[job+"75th"], data[job+"90th"]];

		var draw = true;
		values.forEach(function(d){ if (d === undefined){ draw=false;}});
		// for (var i = 0; i < values.length; i++){
		// 	if (values[i] === undefined) {
		// 		draw = false;
		// 	}
		// }

		if (draw) {

			var svg = d3.select("#boxplot");

			var bp = svg.append("g");

			var x = function(val) {
				return .05 * svg.attr("width") + .9 * svg.attr("width") *
							 (val - values[0]) / (values[4] - values[0]);
			};


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
					.attr("y", .45 * height)
					.attr("height", .1 * height)
					.attr("width", x(values[2]) - x(values[1]))
					.style({"stroke-width": 2, "stroke": "black", "fill": "green"});

					bp.append("rect")
						.attr("x", x(values[2]))
						.attr("y", .45 * height)
						.attr("height", .1 * height)
						.attr("width", x(values[3]) - x(values[2]))
						.style({"stroke-width": 2, "stroke": "black", "fill": "green"});

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[0]))
						.attr("y", .35 * height)
						//.attr("lengthAdjust", "spacingAndGlyphs")
						.attr("length", 50)
						.text('$' + values[0]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[1]))
						.attr("y", .7 * height)
						.text('$' + values[1]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[2]))
						.attr("y", .35 * height)
						.text('$' + values[2]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[3]))
						.attr("y", .7 * height)
						.text('$' + values[3]);

					bp.append("text")
						.attr("text-anchor", "middle")
						.attr("x", x(values[4]))
						.attr("y", .35 * height)
						.text('$' + values[4]);


					//bp.attr("transform", "translate(" + [ width, -.5 * height] +")scale(" + 2.5 + ")")
					bp.attr("transform", "translate("+ [0, - scale * height * .65] +")scale(" + 3.5 + ")")
					//bp.attr("transform", "scale(" + 2.5 + ")")
		} else {

			d3.select(".tri-1").insert("h3", "#plotdiv").text("No data found for entry \'" + job + "\'")

		}
  });

};
