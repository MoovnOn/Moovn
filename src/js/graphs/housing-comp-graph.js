var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state1, city1, state2, city2) {

		Promise.all([

			$.ajax({
	      method: 'GET',
	      url: '/api/homeprices/' + state1 + '/' + city1 + '/'
	    }),

	    $.ajax({
	      method: 'GET',
	      url: '/api/homeprices/' + state2 + '/' + city2 + '/'
	    })
	    ]).then(function(results) {
	    	var parsedData1 = parseHousing(results[0]);
				var arr1 = parsedData1.data.columns;
				var cleanArr1 = arr1.map(function(obj) {
					return obj[1];
				});

				var parsedData2 = parseHousing(results[1]);
				var arr2 = parsedData2.data.columns;
				var cleanArr2 = arr2.map(function(obj) {
					return obj[1];
				});

				var sortArr1 = cleanArr1.sort().reverse();
				var sortArr2 = cleanArr2.sort().reverse();

				var highVal1 = parseInt(sortArr1[0]);
				var highVal2 = parseInt(sortArr2[1]);


				var maxCost = highVal1;
				if (highVal2 > highVal1) {
					maxCost = highVal2;
				};

				parseHousing(results[0],'.comp-chart1-3', maxCost);
				parseHousing(results[1], '.comp-chart2-3', maxCost);

			});
			

  function parseHousing(allHousingData, element, maxCost){
    var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    var housingAfford= allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
    var housingRealEstate= allHousingData["Demographics:demographics"].response.pages.page[1].tables.table;
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;

    var housingAffordCondo = housingAfford[2].values.city.value["#text"];
    var housingAfford2Bed = housingAfford[3].values.city.value["#text"];
    var housingAfford3Bed = housingAfford[4].values.city.value["#text"];
    var housingAfford4Bed = housingAfford[5].values.city.value["#text"];


      var data = {
        bindto: element,
        data: {
          columns: [
              ['Condo', housingAffordCondo],
              ['2-Bed', housingAfford2Bed],
              ['3-Bed', housingAfford3Bed],
              ['4-Bed', housingAfford4Bed],
          ],
          type: 'bar',
          colors: {
            'Condo': '#3D5E99',
            '2-Bed': '#CC2E14',
            '3-Bed': '#707D94',
            '4-Bed': '#FF7640',
          },
        },
        axis: {
          x: {
            type: 'category',
            categories: ['Median Housing Prices']
        	},
            y : {
            	max: maxCost,
              tick: {
                format: d3.format("$,"),
              }
            }
          },
          size: {
        		height: 400
      		},
       }

      var chart = c3.generate(data);
      return data;
  };

  //return data;
};
