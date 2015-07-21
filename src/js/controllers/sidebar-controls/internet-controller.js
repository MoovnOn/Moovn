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
var parseCell = require('../../graphs/parse-cell');
var downloadGraph = require('../../graphs/cell-download');
var reliabilityGraph = require('../../graphs/cell-reliability');
var sideBar = require('../side-bar-controller');
var parseCell2 = require('../../graphs/parse-cell-2')


router.route('search/:cityName/internet', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('city-template-2', '.main-content', {city: cityName});

  sideBar();
    
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];


  parseCell(state, city, '.duo-1', '.duo-2');

  $('.download-title').prepend('<h2 class = "pure-u-1 graph-download-title">User Reported Data Speeds</h2><br><p class = "graph-download-subtitle">Updated weekly, data availability varies</p>');
  $('.rel-title').prepend('<h2 class = "pure-u-1 graph-rel-title">User Reported Reliability Scores</h2><br><p class = "graph-download-subtitle">Updated weekly, data availability varies</p>');
    
});
