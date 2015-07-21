var $ = require('jquery');

module.exports = function(array1, array2) {

	var firstArray = array1[0];
	var secondArray = array2[0];

	var loadSpeeds1 = [];
	var loadSpeeds2 = [];


	firstArray.forEach(function(e){
		loadSpeeds1.push(e.type4G.downloadSpeed)
	})

	secondArray.forEach(function(e){
		loadSpeeds2.push(e.type4G.downloadSpeed)
	})

	var srtArr1 = loadSpeeds1.sort(function(a, b){return b-a});
	var srtArr2 = loadSpeeds2.sort(function(a, b){return b-a});

	var twoHighest = [srtArr1[0], srtArr2[0]];

	var highest = twoHighest.sort(function(a, b){return b-a});

	var maxVal = Math.ceil(highest[0]);

	return maxVal;
	

};