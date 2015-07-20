var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function (allHousingData){
  var housingAfford;
  try{
    housingAfford = allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
  } catch (e){
    housingAfford = [0,0,0,0];
  };

  var housingAffordData = [];
  for (var i = 2; i < 6; i++){
    try{
      housingAffordData.push(housingAfford[i].values.neighborhood.value["#text"]);
    }catch (e){
      housingAffordData.push(0);
    }
  }


  var chart = c3.generate({
    bindto: '.housing-graph',
    data: {
      columns: [
          ['Condo', housingAffordData[0]],
          ['2-Bed', housingAffordData[1]],
          ['3-Bed', housingAffordData[2]],
          ['4-Bed', housingAffordData[3]],
      ],
      type: 'bar',
      colors: {
            'Condo': '#B1D3DD',
            '2-Bed': '#BDBBC3',
            '3-Bed': '#51ABD2',
            '4-Bed': '#55818F',
          },
    },
    axis: {
        x: {
            type: 'category',
            categories: ['Median Housing Prices']
        	},
        y : {
          tick: {
            format: d3.format("$,")
          }
        }
      },
      size: {
    		height: 400
  		},
   });

};
