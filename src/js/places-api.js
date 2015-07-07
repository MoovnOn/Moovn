var map;
var service;
var infowindow;
var $ = require('jquery') 

module.exports = function(query) {

	var key = 'AIzaSyB6Gp2tJP3mWdIFot6fZNfarDoopGurZSs';
	var request = {
	    query: "banks" + query
	};

	map = new google.maps.Map(document.getElementById('map'));

	service = new google.maps.places.PlacesService(map);
	
	service.textSearch(request, function(results) {
		  
		  console.log(results);
		  for (var i = 0; i < results.length; i++) {
      var place = results[i];
      	$('.banks-tab-data').append('<p>' + place.name + '</p>')
    	}

	});

};	
