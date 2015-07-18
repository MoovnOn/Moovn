var $ = require('jquery');
var jQuery = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var places = require('../../places-api');
var tab = require('responsive-tabs');
var drawNeigh = require('../../neighMap');
var zoom = require('../../zoom');
var searchFunction = require('../../search');
var views = require('views');
var peopleAge = require('../../graphs/people-age');
var peopleHousehold = require('../../graphs/people-household');
var peopleRelationships = require('../../graphs/people-relationships');
var liveshere = require('../../list-data/liveshere');
var activeSelection = require('../active-selection');


router.route('search/:cityName/people', function (cityName){

  show('side-bar-city-search', '.side-bar-content', {city: cityName});
  searchFunction();
  show('people-template', '.main-content' , {city: cityName});
  activeSelection();

  var citySplit = cityName.split(', ');
  var city = citySplit[0];
  var state = citySplit[1];


  peopleAge(state, city, '.people-top-graph');
  peopleHousehold(state, city, '.people-middle-graph');
  peopleRelationships(state, city, '.people-bottom-graph');

  liveshere(state, city);

});
