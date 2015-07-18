var $ = require('jquery');
var c3 = require('c3');

module.exports = function (data, bindTo) {

    var aTDwnld3 = Math.round(data[0].type3G.downloadSpeed);
    var vDwnld3 = Math.round(data[1].type3G.downloadSpeed);
    var sDwnld3 = Math.round(data[2].type3G.downloadSpeed);
    var tmDwnld3 = Math.round(data[3].type3G.downloadSpeed);

    var aTUpld3 = Math.round(data[0].type3G.uploadSpeed);
    var vUpld3 = Math.round(data[1].type3G.uploadSpeed);
    var sUpld3 = Math.round(data[2].type3G.uploadSpeed);
    var tmUpld3 = Math.round(data[3].type3G.uploadSpeed);

    var aTDwnld4 = Math.round(data[0].type4G.downloadSpeed);
    var vDwnld4 = Math.round(data[1].type4G.downloadSpeed);
    var sDwnld4 = Math.round(data[2].type4G.downloadSpeed);
    var tmDwnld4 = Math.round(data[3].type4G.downloadSpeed);

    var aTUpld4 = Math.round(data[0].type4G.uploadSpeed);
    var vUpld4 = Math.round(data[1].type4G.uploadSpeed);
    var sUpld4 = Math.round(data[2].type4G.uploadSpeed);
    var tmUpld4 = Math.round(data[3].type4G.uploadSpeed);


  	var chart = c3.generate({
    bindto: bindTo,
    data: {
        columns: [
            ['AT&T', aTDwnld3, aTUpld3, aTDwnld4, aTUpld4 ],
            ['Verizon', vDwnld3, vUpld3, vDwnld4, vUpld4 ],
            ['Sprint', sDwnld3, sUpld3, sDwnld4, sUpld4 ],
            ['T-mobile', tmDwnld3, tmUpld3, tmDwnld4, tmUpld4 ],
            // ['Cellular-one', c1Dwnld3, c1Upld3]
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
            categories: ['3G Download', '3G Upload' , '4G Download', '4G Upload']
        	},
          y: {
            label: "Megabits Per Second",
            max: 1900
          }
    		},
		});

};