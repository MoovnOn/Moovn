var $ = require('jquery');
var c3 = require('c3');

module.exports = function(data, bindTo) {

		var aTRel3 = Math.round(data[0].type3G.reliability);
  	var vRel3 = Math.round(data[1].type3G.reliability);
		var tmRel3 = Math.round(data[3].type3G.reliability);

		var aTRel4 = Math.round(data[0].type4G.reliability);
  	var vRel4 = Math.round(data[1].type4G.reliability);
		var sRel4 = Math.round(data[2].type4G.reliability);
		var tmRel4 = Math.round(data[3].type4G.reliability);

		var chart = c3.generate({
    bindto: bindTo,
    data: {
        columns: [
            ['AT&T', aTRel3, aTRel4],
            ['Verizon', vRel3, vRel4],
            ['Sprint', sRel4],
            ['T-mobile', tmRel3, tmRel4],
        ],
        type: 'bar', 
        colors: {
          'AT&T': '#F8A01C',
          'Verizon': '#ED1C24',
          'Sprint': '#FFDE05',
          'T-mobile': '#EB278D',
          },
          color: function (color, d) {
              // d will be 'id' when called for legends
              return d.id && d.id === 'data3' ? d3.rgb(color).darker(d.value / 150) : color;
          }  
  			},
  	 		axis: {
       		x: {
            type: 'category',
            categories: ['3G-Reliability', '4G-Reliability']
        	},
          y: {
            label: "Reliability Score",
            max: 100,
            min: 85,
            // Range includes padding, set 0 if no padding needed
            // padding: {top:0, bottom:0}
          }
    		},
		}); 	
};