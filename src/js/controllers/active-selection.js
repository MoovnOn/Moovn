var $ = require('jquery');

  module.exports = function(){
    if( window.location.href.indexOf("housing") > -1 ){
      $(".housing").addClass("side-nav-item-active");
      $(".fa-home").addClass("side-icon-active");
    }else if( 
      window.location.href.indexOf("internet") > -1 ){
      $(".internet").addClass("side-nav-item-active");
      $(".fa-laptop").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("people") > -1 ){
      $(".people").addClass("side-nav-item-active");
      $(".fa-male").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("transportation") > -1 ){
      $(".transportation").addClass("side-nav-item-active");
      $(".fa-car").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("industry") > -1 ){
      $(".industry").addClass("side-nav-item-active");
      $(".fa-building").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("taxes") > -1 ){
      $(".taxes").addClass("side-nav-item-active");
      $(".fa-money").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("leisure") > -1 ){
      $(".leisure").addClass("side-nav-item-active");
      $(".fa-beer").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("education") > -1 ){
      $(".education").addClass("side-nav-item-active");
      $(".fa-book").addClass("side-icon-active");
    }else if( 
      window.location.href.indexOf("overview") > -1 ){
      $(".overview").addClass("side-nav-item-active");
      $(".fa-plane").addClass("side-icon-active");
    }
    

}