var $ = require('jquery');

  module.exports = function(){
  
  //slides the menu for mobile view
    $('.bar-menu-icon').click(function() {
      $('.side-nav-container').toggle( "slide" );
      $('.side-bar-background').fadeIn();
    });
    $('.side-bar-background').click(function(){
      $('.side-nav-container').toggle( "slide" );
      $('.side-bar-background').fadeOut();
    });
    
    $(window).resize(function(){
       if($(window).width() > 670){
          $('.side-nav-container').fadeIn();
        }
    })
 
    
    //changes side-nav styles to indicate which selection user is on.
    if( window.location.href.indexOf("housing") > -1 ){
      $(".housing").addClass("side-nav-item-active");
      $(".fa-home").addClass("side-icon-active");
    }else if( 
      window.location.href.indexOf("internet") > -1 ){
      $(".internet").addClass("side-nav-item-active");
      $(".fa-cell").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("people") > -1 ){
      $(".people").addClass("side-nav-item-active");
      $(".fa-users").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("industry") > -1 ){
      $(".industry").addClass("side-nav-item-active");
      $(".fa-briefcase").addClass("side-icon-active");
    }
    else if( 
      window.location.href.indexOf("places") > -1 ){
      $(".leisure").addClass("side-nav-item-active");
      $(".fa-location-arrow").addClass("side-icon-active");
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