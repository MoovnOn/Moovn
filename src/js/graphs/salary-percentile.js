var d3 = require('d3');
var $ = require('jquery');
var box = require('../box');

module.exports = function(state, city, job, height, width) {

	$.ajax({
    method: 'GET',
    url: 'api/salary/' + state + '/' + city + '/' + job
  }).done(function(data){

  	var values = [data[job+"10th"], data[job+"25th"], data[job+"50th"],
									data[job+"75th"], data[job+"90th"]];

		var x = d3.scale.linear()
			.domain([values[0], values[4]])
			.range([.1 * width, .9 * width]);

		var bp = d3.select("#boxplot");

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
				.attr("y", .4 * height)
				.attr("height", .2 * height)
				.attr("width", x(values[2]) - x(values[1]))
				.style({"stroke-width": 2, "stroke": "black", "fill": "white"});

				bp.append("rect")
					.attr("x", x(values[2]))
					.attr("y", .4 * height)
					.attr("height", .2 * height)
					.attr("width", x(values[3]) - x(values[2]))
					.style({"stroke-width": 2, "stroke": "black", "fill": "white"});


				var g = bp.append("g");

				g.append("text")
					.attr("text-anchor", "middle")
					.attr("x", x(values[0]))
					.attr("y", .3 * height)
					.text(values[0]);

				g.append("text")
					.attr("text-anchor", "middle")
					.attr("x", x(values[1]))
					.attr("y", .3 * height)
					.text(values[1]);

				g.append("text")
					.attr("text-anchor", "middle")
					.attr("x", x(values[2]))
					.attr("y", .3 * height)
					.text(values[2]);

				g.append("text")
					.attr("text-anchor", "middle")
					.attr("x", x(values[3]))
					.attr("y", .3 * height)
					.text(values[3]);

				g.append("text")
					.attr("text-anchor", "middle")
					.attr("x", x(values[4]))
					.attr("y", .3 * height)
					.text(values[4]);

				//g.attr("transform", "transform(" +  + ")scale(" + 2 + ")")

		/**
		find m = [A, B, C, D, E, F, G] (so find A, G) such that

		sum(m) = 7*D

			A*10 = 7*D

		G*10 = 7*D

		(A + B)*4 = 7*D

		(A + B + C)*2 = 7*D

		(A + B + C + D)

		**/
		// function generate(nums) {
		// 	var rand = [];
		// 	rand.push(nums[2]*7/10)
		// 	nums.forEach(function(d){ rand.push(d);});
		// 	rand.push(nums[2]*7/10)
		//
		// 		return rand;
		// };
		//
		//
		// chartData = generate(values);

		// var chart = d3.box()
		// 			.whiskers([values[0], values[4]])
		// 			.height(height)
		// 			.width(width);
		//
		// var svg = d3.select("#boxplot")
		// 						.data(chartData)
		// 						.enter().append("g")
		// 						.attr("class", "box")
		// 						.attr("width", width)
		// 						.attr("height", height)
		// 						.call(chart);

  });

};

  //   c3.generate({
  //      bindto: '.tri-1',
  //       data: {
  //           x: 'x',
  //           columns: [
  //               ['x', '25', '50', '75', '90'],
  //               ['25th', data[job+"25th"]],
  //               ['50th', data[job+"50th"]],
  //               ['75th', data[job+"75th"]],
  //               ['90th', data[job+"90th"]]
  //           ],
  //              type: 'bar'
  //        }
  //   });
  // });
//}
