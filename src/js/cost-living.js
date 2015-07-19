var $ = require('jquery');

module.exports = function(state, city, element) {

	$.ajax({
    method: 'GET',
    url: '/api/parity/' + state + '/' + city + '/'
  })
	  .then(function(data){
	    $(element).append('<p>' + data + '</p>');
	  });

};    