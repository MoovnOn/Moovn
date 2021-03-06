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
var sideBar = require('../side-bar-controller');
var autocomplete = require('jquery-ui');
var jobtitles = require('../../job-titles');
var bubbleChart = require('../../graphs/industry-bubble');
var salaryPer = require('../../graphs/salary-percentile');


router.route('search/:cityName/industry', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();

  show('city-template-3', '.main-content', {city: cityName});
  sideBar();

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  var width = $(".bubble-chart").width(),
      aspect = 1;

  var width2 = $("#plotdiv").width();
  d3.select("#plotdiv").insert("p", "#boxplot")
    .text("Percentiles shown: 10th, 25th, 50th, 75th, 90th");

  var svg = d3.select(".bubble-chart").append("svg")
              .attr("preserveAspectRatio", "xMidYMid")
              .attr("viewBox", "0 0 1000 1000")
              .attr("width", width)
              .attr("height", width * aspect)
              .call(bubbleChart, state, city, aspect * width, width);

  var svg2 = d3.select("#boxplot")
    .attr("preserveAspectRatio", "xMidYMid")
    .attr("viewBox", "0 0 1000 1000")
    .attr("width", width2)
    .attr("height", (width2 * aspect) /3);

  $(window).resize(function(){
    var width = $(".bubble-chart").width();
    var width2 = $(".tri-1").width();
    svg.attr("width", width);
    svg.attr("height", width * aspect);
    svg2.attr("width", width2);
    svg2.attr("height", (width2 * aspect) /3);
  });

  $('.main-content').on('submit', '.industry-form', function(e) {
    e.preventDefault();
    e.stopPropagation();
    var job = $('.job-input').val();
    salaryPer(state, city, job, aspect * width, width);
  });


  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];

  incomeCity(state, city, '.tri-3');

  $("#job-input").autocomplete({
    source: jobtitles,
    messages: {
      noResults: '',
      results: function() {}
    }
  });

  $('.industry-form').submit(function(){
    var job = $('.job-input').val();
    $('.salary-title').html('Salaries for <span class="salary-title-job">'+ job +"</span> in " + cityName);
  })

 $(document).ready(function() {
    $("#job-input").val("Web Developers");
    $("#job-input").submit();
    $("#job-input").val("");
  });

});
