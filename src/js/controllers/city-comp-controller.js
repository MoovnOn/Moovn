var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var parseCell = require('../graphs/parse-cell-comp2');
var parseCell2 = require('../graphs/parse-cell-2');
var downloadGraph = require('../graphs/cell-download');
var sideBar = require('./side-bar-controller');
var searchFunction = require('../search');
var peopleAge = require('../graphs/people-age');
var housingGraphGeneral = require('../graphs/housing');
var commuteTime = require('../graphs/commute-times');
var housingGraph = require('../graphs/housing-comp-graph');
var taxDetails = require('../tax-details');
var costLiving = require('../cost-living');
var commuteComp = require('../commute-comp');


router.route( 'search/:cityName1/:cityName2', function (cityName1, cityName2){
 
if($(document).width() < 670){
  show('comparison-mobile', '.main-content', {city1: cityName1, city2: cityName2});
 $('.right').hide();
 
}

if($(document).width() > 670){
  show('comparison', '.main-content', {city1: cityName1, city2: cityName2});
}

//JS for mobile
    $('.comp-header').on('click',function(){
      $('.left').toggle();
      $('.right').toggle();
    });
 

  // sideBar();
  
  var citySplit1 = cityName1.split(', ');
  var city1 = citySplit1[0];
  var state1 = citySplit1[1];

  var citySplit2 = cityName2.split(', ');
  var city2 = citySplit2[0];
  var state2 = citySplit2[1];


  parseCell(state1, city1, state2, city2, '.comp-chart1-4', '.comp-chart2-4');

  // $('.bar-menu-icon').click(function() {
  //   $( ".side-nav-container" ).toggle( "slide" );
  // });

  peopleAge(state2, city2, '.comp-chart2-5', 'bar');
  peopleAge(state1, city1, '.comp-chart1-5', 'bar');

costLiving(state2, city2, ".comp2-1");
  costLiving(state1, city1, ".comp1-1");
  
commuteComp(state2, city2, ".comp2-2");
  commuteComp(state1, city1, ".comp1-2");
  
taxDetails(state2, city2, ".comp2-3");
  taxDetails(state1, city1, ".comp1-3");
  
  housingGraph(state1, city1, state2, city2);

  commuteTime(state2, city2, '.comp-chart2-6');
  commuteTime(state1, city1, '.comp-chart1-6');
  


  
});