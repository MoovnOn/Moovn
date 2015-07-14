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
    var housingDivFemale = housingPeople[4].data.attribute[0].value['#text'];
    var housingDivMale = housingPeople[4].data.attribute[1].value['#text'];
    var housingMarriedFemale = housingPeople[4].data.attribute[2].value['#text'];
    var housingMarriedMale = housingPeople[4].data.attribute[3].value['#text'];
    var housingSingleFemale = housingPeople[4].data.attribute[4].value['#text'];
    var housingSingleMale = housingPeople[4].data.attribute[5].value['#text'];
    var housingWidowedFemale = housingPeople[4].data.attribute[6].value['#text'];
    var housingWidowedMale = housingPeople[4].data.attribute[7].value['#text'];


      c3.generate({
          bindto: 'body .quad-3',
          data: {
              columns: [
                  ['Divorced Female', housingDivFemale],
                  ['Divorced Male', housingDivMale],
                  ['Married Female', housingMarriedFemale],
                  ['Married Male', housingMarriedMale],
                  ['Single Female', housingSingleFemale],
                  ['Single Male', housingSingleMale],
                  ['Widowed Female', housingWidowedFemale],
                  ['Widowed Male', housingWidowedMale],
              ],
              type : 'donut',
              onclick: function (d, i) {},
              onmouseover: function (d, i) {},
              onmouseout: function (d, i) {}
          },
          donut: {
              title: "Relationship Status"
          },
          size: {
      		height: 400
      		},
      });

  }
};
