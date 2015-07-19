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
var incomeCity = require ('../../graphs/income-city-wide');
var taxDetails = require('../../tax-details');
var costLiving = require('../../cost-living');

router.route('search/:cityName/overview', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('city-template-overview', '.main-content', {city: cityName});
  sideBar();
  
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

//cost of living
costLiving(state, city, '.overview-cost-container');    


//income graph
incomeCity(state, city, '.overview-graph3');

//housing city-wide
housingGraphGeneral(state, city, '.overview-graph2')

//commuting
commuteTime(state, city, '.overview-graph1');

//taxes
taxDetails(state, city, ".overview-tax-container");

  
});