var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function (allHousingData){
  var housingAfford = allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;

  var housingAffordData = [];
  for (var i = 2; i < 6; i++){
    try{
      housingAffordData.push(housingAfford[i].values.neighborhood.value["#text"]);
    }catch (e){
      housingAffordData.push(0);
    }
  }

  var chart = c3.generate({
    bindto: 'body .quad-2',
    data: {
      columns: [
          ['Condo', housingAffordData[0]],
          ['2-Bed-Home', housingAffordData[1]],
          ['3-Bed-Home', housingAffordData[2]],
          ['4-Bed-Home', housingAffordData[3]],
      ],
      type: 'bar'
    },
    axis: {
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
