var map;
var service;
var infowindow;
var $ = require('jquery') 

module.exports = function(city, searchTerm, tabContainer, tabtitle) {
	$(tabtitle).children('a').text(searchTerm.charAt(0).toUpperCase() + searchTerm.slice(1));

	var key = 'AIzaSyB6Gp2tJP3mWdIFot6fZNfarDoopGurZSs';
	var request = {
	    query: searchTerm + " " + city
	};
	map = new google.maps.Map(document.getElementById('map'));
	service = new google.maps.places.PlacesService(map);
	service.textSearch(request, function(results) {
	  for (var i = 0; i < results.length; i++) {
    	var place = results[i];
    	$(tabContainer).append('<span class="clickSpan" id=' + place.place_id +'>' + place.name + '</span><br>');
		}
	});
	
	// setTimeout(function() {
		// placeArr.forEach(function(i) {
		// 	console.log(i)
		// 	console.log(placeArr)
		// 	var place = placeArr[i];
		// 	var placeId = place.place_id;
		// 	service.getDetails(placeId, function(result, status) {
  //     	console.log(result)
		// })
		// }, 2000)
	// });	
// $(tabContainer).append('<p>' + place.name + '</p>')
};