$ = require('jquery');

module.exports = function() {

	$.ajax({
  	method: 'GET',
  	url: 'api/celldata/NC/Durham/'
  }).done(function (data){	
  	console.log(data)
  });	


}