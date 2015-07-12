var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city) {

  $.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);

  
  function parseHousing(allHousingData){
    
    
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;    
    var housingPeople0 = housingPeople[1].data.attribute[1].value['#text'];
    var housingPeople10 = housingPeople[1].data.attribute[2].value['#text'];
    var housingPeople20 = housingPeople[1].data.attribute[3].value['#text'];
    var housingPeople30 = housingPeople[1].data.attribute[4].value['#text'];
    var housingPeople40 = housingPeople[1].data.attribute[5].value['#text'];
    var housingPeople50 = housingPeople[1].data.attribute[6].value['#text'];
    var housingPeople60 = housingPeople[1].data.attribute[7].value['#text'];
    var housingPeople70 = housingPeople[1].data.attribute[0].value['#text'];
    
      c3.generate({
          bindto: 'body .quad-1',
          data: {
              columns: [
                  ['0-9', housingPeople0],
                  ['10-19', housingPeople10],
                  ['20-29', housingPeople20],
                  ['30-39', housingPeople30],
                  ['40-49', housingPeople40],
                  ['50-59', housingPeople50],
                  ['60-69', housingPeople60],
                  ['70+', housingPeople70],
              ],
              type : 'donut',
              onclick: function (d, i) { console.log("onclick", d, i); },
              onmouseover: function (d, i) { console.log("onmouseover", d, i); },
              onmouseout: function (d, i) { console.log("onmouseout", d, i); }
          },
          donut: {
              title: "Age of Population (yrs)"
          },
          size: {
      		height: 400
      		},
      });
             
       
       

      // c3.generate({
      //   bindto: 'body .quad-1',
      //   data: {
      //     columns: [
      //         ['Minutes Spent Commuting', housingPeopleCommute],
      //         ['Minutes Spent Commuting', housingPeopleCommute],
      //     ],
      //     type: 'bar'
      //   },
      //   axis: {
      //       y: {
      //         label: 'minutes'
      //       },
      //       x: {
      //         type: 'category',
      //         categories: [ city + " " + 'Commute Time', 'National Commute Time']
      //   	  },
      //     },
      //     size: {
      //   		height: 400
      // 		},
      //  });
            


    

  
  }
};

