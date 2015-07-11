var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var chart = require('../../c3-charts');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var d3 = require('d3');
var drawMap = require('../../drawMap');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var showSideBar = require('../../show-sidebar');

router.route('search/:cityName/transportation', function (cityName){

  showSideBar('side-bar-city-search', cityName);
  searchFunction();
  show('test', {city: cityName});
 
});