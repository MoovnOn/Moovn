var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, element) {

  $.ajax({
    method: 'GET',
    url: '/api/homeprices/' + state + '/' + city + '/'
  })
  .then(parseHousing);

  
  function parseHousing(allHousingData){
    
    var housingPeople= allHousingData["Demographics:demographics"].response.pages.page[2].tables.table;    
    var housingNoKids = housingPeople[3].data.attribute[0].value['#text'];
    var housingWithKids = housingPeople[3].data.attribute[1].value['#text'];
    
      c3.generate({
          bindto: element,
          data: {
              columns: [
                  ['% No Kids', housingNoKids],
                  ['% With Kids', housingWithKids],
              ],
              type : 'donut',
              onclick: function (d, i) {},
              onmouseover: function (d, i) {  },
              onmouseout: function (d, i) { },
                colors: {
                '% No Kids': '#B1D3DD',
                '% With Kids': '#51ABD2',
              },
          },
          donut: {
              title: "Household Composition"
          },
          size: {
      		height: 280
      		},
      });
             
  }
};

