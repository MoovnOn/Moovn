var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var parseCell = require('../graphs/parse-cell');
var parseCell2 = require('../graphs/parse-cell-2');
var downloadGraph = require('../graphs/cell-download');
var activeSelection = require('./active-selection');
var searchFunction = require('../search');


router.route( 'search/:cityName1/:cityName2', function (cityName1, cityName2){
 
 	show('side-bar-city-search', '.side-bar-content', {city1: cityName1});
 	searchFunction();
 	show('city-template-vertical', '.main-content', {city1: cityName1, city2: cityName2})
 	activeSelection();
 	

 	var citySplit1 = cityName1.split(', ');
  var city1 = citySplit1[0];
  var state1 = citySplit1[1];

  var citySplit2 = cityName2.split(', ');
  var city2 = citySplit2[0];
  var state2 = citySplit2[1];

  console.log(city1)
  console.log(city2)
  console.log(state1)
  console.log(state2)

  parseCell(state1, city1).then(function (data) {
      var data2 = parseCell2(data);

      downloadGraph(data2, '.duo-1-vert' )
  });

  parseCell(state2, city2).then(function (data) {
      var data2 = parseCell2(data);  

      downloadGraph(data2, '.duo-2-vert' )
  });

  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });




  
});