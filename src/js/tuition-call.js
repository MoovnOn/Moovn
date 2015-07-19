var $ = require('jquery');
var _ = require('underscore');

module.exports = function(state, city) {
	
	$.ajax({
		method: 'GET',
		url: '/api/college/' + state + '/' + city + '/'
	}).then(function(data) {

	if(_.isEmpty(data) === false){
		for(key in data)
			var keyName = key;
			$('#tab-3').append('<p>' + keyName.substring(1, keyName.length-1) + '</p>');
			$('.tab-title3').children('a').text('US News Best Colleges');	

		for(key in data) {
	    if(data.hasOwnProperty(key)) {
	      var value = data[key];
			  for(key in value) {
			    var value2 = value[key];
			      if (value2 != null) {
							$('#tab-3').append('<p>' + key + ': $' + value2 + '</p>')
			      }     	
			  }
			}
		}
	}




 			
	});	

};