$ = require('jquery');
d3 = require('d3');

module.exports = function() {

	$.ajax({
		method: 'GET',
		url: 'api/neighborhoods/Durham/NC/'
	}).done(function(data) {
		console.log(data);
	})

};