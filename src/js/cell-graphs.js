var $ = require('jquery');
var c3 = require('c3');

module.exports = function (state, city) {

  return $.ajax({
  	method: 'GET',
  	url: 'api/celldata/NC/Durham/'
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
  		if (prov.networkName === "Cellular One") {
  			newArray[4] = prov
  		}
  	})
    return newArray
  });

}

// Use this to return newArray
// cellChart(state, city).then(function (data) {
//       // TODO: render data
//     });

    // var aTDwnld3 = Math.round(newArray[0].type3G.downloadSpeed);
    // var vDwnld3 = Math.round(newArray[1].type3G.downloadSpeed);
    // var sDwnld3 = Math.round(newArray[2].type3G.downloadSpeed);
    // var tmDwnld3 = Math.round(newArray[3].type3G.downloadSpeed);
    // var c1Dwnld3 = Math.round(newArray[4].type3G.downloadSpeed);

    // var aTUpld3 = Math.round(newArray[0].type3G.uploadSpeed);
    // var vUpld3 = Math.round(newArray[1].type3G.uploadSpeed);
    // var sUpld3 = Math.round(newArray[2].type3G.uploadSpeed);
    // var tmUpld3 = Math.round(newArray[3].type3G.uploadSpeed);
    // var c1Upld3 = Math.round(newArray[4].type3G.uploadSpeed);

    // var aTDwnld4 = Math.round(data.networkRank[0].type4G.downloadSpeed);
    // var vDwnld4 = Math.round(data.networkRank[1].type4G.downloadSpeed);
    // var sDwnld4 = Math.round(data.networkRank[2].type4G.downloadSpeed);
    // var tmDwnld4 = Math.round(data.networkRank[3].type4G.downloadSpeed);

    // var aTUpld4 = Math.round(data.networkRank[0].type4G.uploadSpeed);
    // var vUpld4 = Math.round(data.networkRank[1].type4G.uploadSpeed);
    // var sUpld4 = Math.round(data.networkRank[2].type4G.uploadSpeed);
    // var tmUpld4 = Math.round(data.networkRank[3].type4G.uploadSpeed);



  // 	var chart = c3.generate({
  //   bindto: 'body .city-chart-container',
  //   data: {
  //       columns: [
  //           ['AT&T', aTDwnld3, aTUpld3, aTDwnld4, aTUpld4 ],
  //           ['Verizon', vDwnld3, vUpld3, vDwnld4, vUpld4 ],
  //           ['Sprint', sDwnld3, sUpld3, sDwnld4, sUpld4 ],
  //           ['T-mobile', tmDwnld3, tmUpld3, tmDwnld4, tmUpld4 ],
  //           ['Cellular-one', c1Dwnld3, c1Upld3]
  //       ],
  //       type: 'bar',   
  // 			},
  // 	 		axis: {
  //      		x: {
  //           type: 'category',
  //           categories: ['3G-Download-Speed-Mbps', '3G-Upload-Speed-Mbps' , '4G-Download-Speed-Mbps', '4G-Upload-Speed-Mbps']
  //       	}
  //   		},
		// });
 	// });	




// module.exports = function() {

// 	$.ajax({
//   	method: 'GET',
//   	url: 'api/celldata/NC/Durham/'
//   }).done(function (data){	

//   	var array = data.networkRank;
//   	var newArray = [];

//   	array.forEach(function(prov) {
//   		if (prov.networkName === "AT&T") {
//   			newArray[0] = prov
//   		}
//   		if (prov.networkName === "Verizon") {
//   			newArray[1] = prov
//   		}
//   		if (prov.networkName === "Sprint") {
//   			newArray[2] = prov
//   		}
//   		if (prov.networkName === "T-Mobile") {
//   			newArray[3] = prov
//   		}
//   	})

// 		var aTRel3 = Math.round(newArray[0].type3G.reliability);
//   	var vRel3 = Math.round(newArray[1].type3G.reliability);
// 		var tmRel3 = Math.round(newArray[3].type3G.reliability);

// 		var aTRel4 = Math.round(newArray[0].type4G.reliability);
//   	var vRel4 = Math.round(newArray[1].type4G.reliability);
// 		var sRel4 = Math.round(newArray[2].type4G.reliability);
// 		var tmRel4 = Math.round(newArray[3].type4G.reliability);

// 		var chart = c3.generate({
//     bindto: '.map-container',
//     data: {
//         columns: [
//             ['AT&T', aTRel3, aTRel4],
//             ['Verizon', vRel3, vRel4],
//             ['Sprint', sRel4],
//             ['T-mobile', tmRel3, tmRel4],
//         ],
//         type: 'bar',   
//   			},
//   	 		axis: {
//        		x: {
//             type: 'category',
//             categories: ['3G-Reliability', '4G-Reliability']
//         	}
//     		},
// 		}); 	
//  	});	
// };

