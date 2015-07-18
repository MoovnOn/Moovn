var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var searchFunction = require('../../search');
var activeSelection = require('../active-selection');
var commuteTime = require('../../graphs/commute-times');
var housingGraphGeneral = require('../../graphs/housing');
var incomeCity = require ('../../graphs/income-city-wide')

router.route('search/:cityName/overview', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('city-template-overview', '.main-content', {city: cityName});
  activeSelection();

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

//cost of living
    $.ajax({
      method: 'GET',
      url: '/api/parity/' + state + '/' + city + '/'
    })
    .then(function(data){
      $('.text-right').append('<p>' + data + '</p>');
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
      client.open("GET", "http://api.zippopotam.us/us/" + state + "/" + city, true);
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
              
               nameArr.forEach(function(e, i) {
                $(".text-left").append(nameArr[i] + " ");
                $(".text-left").append(rateArr[i] + "%<br><br>");
               });
               
               $(".text-left").append("<b>Total Sales Tax Rate = " + result.totalRate + "%<br></b>");
               
            })          
          
      	};
      };
      client.send();
  
});