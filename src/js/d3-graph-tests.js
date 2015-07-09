$ = require('jquery');
d3 = require('d3');

module.exports = function() {

// Gets liveshere descriptions
	// $.ajax({
	// 	method: 'GET',
	// 	url: 'api/neighborhooddata/OR/Portland/'
	// }).done(function(data) {
	// 	var affordability = data['Demographics:demographics'].response.pages.page[0];
	// 	var homes = data['Demographics:demographics'].response.pages.page[1];
	// 	var people = data['Demographics:demographics'].response.pages.page[2];
		
	// 	var liveshereArray = people.segmentation.liveshere;

	// 	liveshereArray.forEach(function(instance) {
	// 		console.log(instance.name)
	// 		console.log(instance.description)
	// 	})

	// })


	$.ajax({
		method: 'GET',
		url: 'api/neighborhoods/NC/Raleigh/'
	}).done(function(data) {
			var array = data.features;
			array.forEach(function(item) {
				console.log(item.properties.NAME);
				console.log(item.properties.GEOID10);
			})

})
};
