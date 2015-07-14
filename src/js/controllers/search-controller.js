var $ = require('jquery');
var _ = require('underscore');
var views = require('views');
var router = require('../router');
var show = require('../show');
var autocomplete = require('jquery-ui');
var tags = require('../city-list');
var searchFunction = require('../search');

router.route('', 'search', function (){
  show('search', '.main-content');
  $('.side-bar-content').html('');
  
  $('.header-home').fadeIn(600);
  $('.search-page-container').fadeIn(600);
  
  searchFunction();
  

});
