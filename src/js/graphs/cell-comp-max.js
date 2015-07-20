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

	var srtArr1 = loadSpeeds1.sort(function(a, b){return a-b});
	var srtArr2 = loadSpeeds2.sort(function(a, b){return a-b});

	var srtReverse = srtArr1.reverse();
	var srtReverse2 = srtArr2.reverse();

	var maxValFn = function() {
		if(srtReverse[0] > srtReverse2[0]) {
			return srtReverse[0]
		} else {
			return srtReverse2[0]
		}
	};

	var maxVal = Math.ceil(maxValFn());

	return maxVal;
	

};