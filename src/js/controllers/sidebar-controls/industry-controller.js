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
var incomeCity = require ('../../graphs/income-city-wide')
var activeSelection = require('../active-selection');
var jobSearch = require('../../job-search');
var autocomplete = require('jquery-ui');
var jobtitles = require('../../job-titles');
var bubbleChart = require('../../graphs/industry-bubble');


router.route('search/:cityName/industry', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();

  show('city-template-3', '.main-content', {city: cityName});
  activeSelection();

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  var width = $(".tri-2").width(),
      aspect = 1;

  var svg = d3.select(".tri-2").append("svg")
              .attr("preserveAspectRatio", "xMidYMid")
              .attr("viewBox", "0 0 900 900")
              .attr("width", width)
              .attr("height", width * aspect)
              .call(bubbleChart, state, city);

  $(window).resize(function(){
    var width = $(".tri-2").width();
    svg.attr("width", width);
    svg.attr("height", width * aspect);
  });

  $('.main-content').on('submit', '.industry-form', function(e) {
    e.preventDefault();
    e.stopPropagation();
    jobSearch(state, city);
  });

  //slides the side-nav
  $('.bar-menu-icon').click(function() {
    $( ".side-nav-container" ).toggle( "slide" );
  });

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  incomeCity(state, city);

  $("#job-input").autocomplete({
    source: jobtitles,
    messages: {
      noResults: '',
      results: function() {}
    }
  });

  //bubbleChart(state, city);

});
