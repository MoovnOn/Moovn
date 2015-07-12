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
    var housingNoKids = housingPeople[3].data.attribute[0].value['#text'];
    var housingWithKids = housingPeople[3].data.attribute[1].value['#text'];
   
    console.log(housingPeople);
    
      c3.generate({
          bindto: 'body .quad-2',
          data: {
              columns: [
                  ['% No Kids', housingNoKids],
                  ['% With Kids', housingWithKids],
              ],
              type : 'donut',
              onclick: function (d, i) {},
              onmouseover: function (d, i) {  },
              onmouseout: function (d, i) { }
          },
          donut: {
              title: "Household Composition"
          },
          size: {
      		height: 400
      		},
      });
             
  }
};
