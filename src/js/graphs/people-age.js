var c3 = require('c3');
var d3 = require('d3');
var $ = require('jquery');

module.exports = function(state, city, bindTo, graphType) {

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
          bindto: bindTo,
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
              type : graphType,
              onclick: function (d, i) {},
              onmouseover: function (d, i) {},
              onmouseout: function (d, i) {},
              colors: {
                '0-9': '#B1D3DD',
                '10-19': '#BDBBC3',
                '20-29': '#51ABD2',
                '30-39': '#55818F',
                '40-49': '#98E6FF',
                '50-59': '#263A40',
                '60-69': '#7C7A7F',
                '70+': '#C492B3',
              },
          },
          axis: {
                 x: {
                    type: 'category',
                    categories: ['Demographics from the US Census']
                  },
                  y: {
                    tick: {
                      format: d3.format('%')
                      //or format: function (d) { return '$' + d; }
                    }
                  }
                },
          donut: {
              title: "Age of Population (yrs)"
          },
          size: {
      		height: 280
      		},
      });
             
  }
};

