var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var parseCell = require('../graphs/parse-cell');
var parseCell2 = require('../graphs/parse-cell-2');
var downloadGraph = require('../graphs/cell-download');
var sideBar = require('./side-bar-controller');
var searchFunction = require('../search');
var peopleAge = require('../graphs/people-age');
var housingGraphGeneral = require('../graphs/housing');
var commuteTime = require('../graphs/commute-times');
var housingGraph = require('../graphs/housing-comp-graph');


router.route( 'search/:cityName1/:cityName2', function (cityName1, cityName2){
 
 	// show('side-bar-city-search', '.side-bar-content', {city1: cityName1});
 	// searchFunction();
 	show('city-template-vertical', '.main-content', {city1: cityName1, city2: cityName2})
 	sideBar();
 	

 	var citySplit1 = cityName1.split(', ');
  var city1 = citySplit1[0];
  var state1 = citySplit1[1];

  var citySplit2 = cityName2.split(', ');
  var city2 = citySplit2[0];
  var state2 = citySplit2[1];

  parseCell(state1, city1).then(function (data) {
      var data2 = parseCell2(data);
      downloadGraph(data2, '.comp-chart1-1' )
  });

  parseCell(state2, city2).then(function (data) {
      var data2 = parseCell2(data);  
      downloadGraph(data2, '.comp-chart2-1' )
  });

  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  peopleAge(state1, city1, '.comp-chart1-2');
  peopleAge(state2, city2, '.comp-chart2-2');


  // housingGraphGeneral(state1, city1, '.comp-chart1-3')
  // housingGraphGeneral(state2, city2, '.comp-chart2-3')

  housingGraph(state1, city1, state2, city2)

  commuteTime(state1, city1, '.comp-chart1-4');
  commuteTime(state2, city2, '.comp-chart2-4');


  
});