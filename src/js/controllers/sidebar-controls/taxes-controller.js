var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var activeSelection = require('../active-selection');


router.route('search/:cityName/taxes', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('city-template-2', '.main-content', {city: cityName});
  activeSelection();

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];
  
  show('content/tabs-lists', '.duo-1')

  //gets the lists displaying as tabs and can change to accordian
  $('#responsiveTabsDemo').responsiveTabs({
      // startCollapsed: 'accordion'
  });
  
    places(cityName, "banks", ".tab-data2", ".tab-title2");
    places(cityName, "Credit Union", ".tab-data3", ".tab-title3");
 
  // var zipAPIKey = "2fXDrXTNbfJ0BvCbMv5FBUugjRrfj34lj1YKZSyb7hbINOUzjZfVUJcdBDsUHxf1"
  //   $.ajax({
  //     method: 'GET',  
  //     url:'https://www.zipcodeapi.com/rest/'+ zipAPIKey + '/city-zips.json/'+ city +'/'+ state 
  //   }).done(function (zipResult){
  //       // var zip = zipResult[0];
  //       var zip = 27701;
  //       console.log(zip);
   
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
              
              $(".tab-title1").html('<a href="#tab-1" class="r-tabs-anchor">Sales Tax Rates</a>');   
              
               nameArr.forEach(function(e, i) {
                $(".tab-data1").append(nameArr[i] + " ");
                $(".tab-data1").append(rateArr[i] + "%<br><br>");
               });
               
               $(".tab-data1").append("<b>Total Sales Tax Rate = " + result.totalRate + "%<br></b>");
               
            })          
          
      	};
      };
      client.send();
      



   

});
