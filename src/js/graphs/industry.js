var $ = require('jquery');
var c3 = require('c3');

module.exports = function (state, city) {

	return $.ajax({
		method: 'GET',
		url:'api/industrydata/'+ state +'/' + city + '/'
	}).done(function(data) {
		return data
	})



};