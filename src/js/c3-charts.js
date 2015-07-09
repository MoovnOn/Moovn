var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');
var cellArray = require('./cell-graphs');

module.exports = function(state, city) {
	console.log(state);
  console.log(city);
  $.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);

  
  function parseHousing(allHousingData){
    var housingResponse = allHousingData["Demographics:demographics"].response.pages.page;
    var housingAfford= allHousingData["Demographics:demographics"].response.pages.page[0].tables.table.data.attribute;
    var housingRealEstate= allHousingData["Demographics:demographics"].response.pages.page[1].tables.table;
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;
    
    var housingAffordCondo = housingAfford[2].values.city.value["#text"];
    var housingAfford2Bed = housingAfford[3].values.city.value["#text"];
    var housingAfford3Bed = housingAfford[4].values.city.value["#text"];
    var housingAfford4Bed = housingAfford[5].values.city.value["#text"];



      var chart = c3.generate({
        bindto: 'body .city-chart-container',
        data: {
          columns: [
              ['Condo', housingAffordCondo],
              ['2-Bed-Home', housingAfford2Bed],
              ['3-Bed-Home', housingAfford3Bed],
              ['4-Bed-Home', housingAfford4Bed],
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
       
 
       
       var housingPeopleIncome= housingPeople[0].data.attribute[0].values.city.value["#text"];
       var housingPeopleIncomeNation= housingPeople[0].data.attribute[0].values.nation.value["#text"];
       var housingPeopleCommute = housingPeople[0].data.attribute[6].values.city.value;
       var housingPeopleCommuteNation = housingPeople[0].data.attribute[6].values.nation.value;
       
       console.log(housingPeopleIncome);
       console.log(housingPeopleCommute);
       console.log(housingPeopleCommuteNation);
       
       $('#chartType').change(function(){ 
         if ($('#income').is(':selected')){
            chart.load({ 
                columns: [
                    ['Median-City-Income', housingPeopleIncome],
                    ['Median-Nation-Income', housingPeopleIncomeNation],
                ],
                unload: ['Condo', '2-Bed-Home','3-Bed-Home','4-Bed-Home'],
                type: 'bar',
             
            })
          }
        })
       
      $('#chartType').change(function(){ 
         if ($('#housing').is(':selected')){
            chart.load({ 
                columns: [
                    ['Condo', housingAffordCondo],
                    ['2-Bed-Home', housingAfford2Bed],
                    ['3-Bed-Home', housingAfford3Bed],
                    ['4-Bed-Home', housingAfford4Bed],
                ],
                unload: ['Median-City-Income', 'Median-Nation-Income'],
                type: 'bar',
             
            })

           }
       })

      $('#chartType').change(function(){ 
         if ($('#cell').is(':selected')){
            cellArray();

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

            // var aTDwnld4 = Math.round(newArray[0].type4G.downloadSpeed);
            // var vDwnld4 = Math.round(newArray[1].type4G.downloadSpeed);
            // var sDwnld4 = Math.round(newArray[2].type4G.downloadSpeed);
            // var tmDwnld4 = Math.round(newArray[3].type4G.downloadSpeed);

            // var aTUpld4 = Math.round(newArray[0].type4G.uploadSpeed);
            // var vUpld4 = Math.round(newArray[1].type4G.uploadSpeed);
            // var sUpld4 = Math.round(newArray[2].type4G.uploadSpeed);
            // var tmUpld4 = Math.round(newArray[3].type4G.uploadSpeed);


            // chart.load({ 
            //  data: {
            //   columns: [
            //     ['AT&T', aTDwnld3, aTUpld3, aTDwnld4, aTUpld4 ],
            //     ['Verizon', vDwnld3, vUpld3, vDwnld4, vUpld4 ],
            //     ['Sprint', sDwnld3, sUpld3, sDwnld4, sUpld4 ],
            //     ['T-mobile', tmDwnld3, tmUpld3, tmDwnld4, tmUpld4 ],
            //     ['Cellular-one', c1Dwnld3, c1Upld3]
            //   ],
            //   unload: ['Condo', '2-Bed-Home','3-Bed-Home','4-Bed-Home'],
            //   type: 'bar',   
            //   },
            //   axis: {
            //   x: {
            //     type: 'category',
            //     categories: ['3G-Download-Speed-Mbps', '3G-Upload-Speed-Mbps' , '4G-Download-Speed-Mbps', '4G-Upload-Speed-Mbps']
            //     }
            // }

            // })





    

           }
       })
  
  }
};

