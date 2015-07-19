var $ = require('jquery');

module.exports = function(state, city) {
	
	$.ajax({
		method: 'GET',
		url: '/api/college/' + state + '/' + city + '/'
	}).then(function(data) {
		console.log(data)
	})

};