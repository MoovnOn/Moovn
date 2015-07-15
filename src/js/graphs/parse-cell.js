var $ = require('jquery');
var c3 = require('c3');

module.exports = function (state, city) {

  return $.ajax({
  	method: 'GET',
  	url: 'api/celldata/' + state + '/' + city + '/'
  }).then(function (data){	

  	var array = data.networkRank;
    var newArray = [];
  	
  	array.forEach(function(prov) {
  		if (prov.networkName === "AT&T") {
  			newArray[0] = prov
  		}
  		if (prov.networkName === "Verizon") {
  			newArray[1] = prov
  		}
  		if (prov.networkName === "Sprint") {
  			newArray[2] = prov
  		}
  		if (prov.networkName === "T-Mobile") {
  			newArray[3] = prov
  		}
  	})
    return newArray
  });

};