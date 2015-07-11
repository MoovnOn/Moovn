var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../../router');
var show = require('../../show');
var autocomplete = require('jquery-ui');
var tags = require('../../city-list');
var searchFunction = require('../../search');
var showSideBar = require('../../show-sidebar');
var searchFunction = require('../../search')

router.route('search/:cityName/education', function (cityName){
	
  showSideBar('side-bar-city-search', cityName);
  searchFunction();
  show('test');

});