var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var searchFunction = require('../../search');
var sideBar = require('../side-bar-controller');
var commuteTime = require('../../graphs/commute-times');
var housingGraphGeneral = require('../../graphs/housing');
var incomeCity = require ('../../graphs/income-city-wide')

router.route('search/:cityName/overview', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('city-template-overview', '.main-content', {city: cityName});
  sideBar();

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

//cost of living
    $.ajax({
      method: 'GET',
      url: '/api/parity/' + state + '/' + city + '/'
    })
    .then(function(data){
      $('.overview-cost-container').append('<p>' + data + '</p>');
    });

//income graph
incomeCity(state, city, '.overview-graph3');

//housing city-wide
housingGraphGeneral(state, city, '.overview-graph2')

//commuting
commuteTime(state, city, '.overview-graph1');

//taxes
  var zipRegex = /\b\d{5}\b/g;

   var client = new XMLHttpRequest();
      client.open("GET", "https://api.zippopotam.us/us/" + state + "/" + city, true);
      client.onreadystatechange = function () {
        if(client.readyState == 4) {
      		var response = client.responseText;
          var zipArr = response.match(zipRegex);
          var zip = zipArr[0];
          var taxAPIKey = "mZ%2B6%2Bz8d%2B%2FlemJE9aFq4nKKnllHyjnV6dxQubPKpTX2X0dGNDGa6OrsVBIKAKyQDWPd%2FC7HqWhEC%2F2Aq41Ybew%3D%3D"
            $.ajax({
              method: 'GET',
              url:'https://taxrates.api.avalara.com:443/postal?country=usa&postal=' + zip + '&apikey=' + taxAPIKey
            }).done(function (result){

              var nameArr = [];
              for (var index = 0; index < result.rates.length; index++) {
                nameArr.push(result.rates[index].name)
              }

              var rateArr = [];
              for (var index = 0; index < result.rates.length; index++) {
                rateArr.push(result.rates[index].rate)
              }

              //changes the case
              function toTitleCase(str){
                return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
              }


               nameArr.forEach(function(e, i) {
                $(".overview-tax-container").append("<p>" + toTitleCase(nameArr[i]) + " " + rateArr[i] + "%</p>");
               });

               $(".overview-tax-container").append("<p><b>Total Sales Tax Rate = " + result.totalRate + "%<br></b></p>");

            })

      	};
      };
      client.send();

});
