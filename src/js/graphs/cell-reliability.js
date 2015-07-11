var $ = require('jquery');
var c3 = require('c3');

module.exports = function(data) {

		var aTRel3 = Math.round(data[0].type3G.reliability);
  	var vRel3 = Math.round(data[1].type3G.reliability);
		var tmRel3 = Math.round(data[3].type3G.reliability);

		var aTRel4 = Math.round(data[0].type4G.reliability);
  	var vRel4 = Math.round(data[1].type4G.reliability);
		var sRel4 = Math.round(data[2].type4G.reliability);
		var tmRel4 = Math.round(data[3].type4G.reliability);

		var chart = c3.generate({
    bindto: '.duo-2',
    data: {
        columns: [
            ['AT&T', aTRel3, aTRel4],
            ['Verizon', vRel3, vRel4],
            ['Sprint', sRel4],
            ['T-mobile', tmRel3, tmRel4],
        ],
        type: 'bar',   
  			},
  	 		axis: {
       		x: {
            type: 'category',
            categories: ['3G-Reliability', '4G-Reliability']
        	}
    		},
		}); 	
};