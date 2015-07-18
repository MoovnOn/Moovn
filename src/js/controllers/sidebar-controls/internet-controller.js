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
var activeSelection = require('../active-selection');
var parseCell2 = require('../../graphs/parse-cell-2')

router.route('search/:cityName/internet', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('city-template-2', '.main-content', {city: cityName});
  activeSelection();
    
  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

	parseCell(state, city).then(function (data) {
      console.log(data);
      var data2 = parseCell2(data);     

      downloadGraph(data2, '.duo-1');
      reliabilityGraph(data2, '.duo-2');
    });

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

});
