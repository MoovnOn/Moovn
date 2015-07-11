require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"city-comp":"<h1>City Comparison</h1>\n\n<h2><%- m.city1 %></h2>\n<h2><%- m.city2 %></h2>","city-cost":"\n\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 city-map-container\"><svg id=\"d3-graphs\"></svg></div>\n    <!--Chart-->\n    <div class=\"pure-u-1 pure-u-lg-1-2 city-chart-container\"><p>Chart</p></div>\n      <select id=\"chartType\">\n        <option value=\"housing\" id=\"housing\">Housing</option>\n        <option value=\"cell\" id=\"cell\">Cell Providers</option>\n        <option value=\"demographics\" id=\"demographics\">Demographics</option>\n        <option value=\"income\" id=\"income\">Income</option>\n      </select>\n\n    <!--Lists-->\n      <div class=\"pure-u-1 pure-u-lg-1-1 tab-list-container\" id=\"responsiveTabsDemo\">\n        <ul>\n            <li class=\"income-tab-title\"><a href=\"#tab-1\"> Income </a></li>\n            <li class=\"taxes-tab-title\"><a href=\"#tab-2\"> Taxes </a></li>\n        </ul>\n        <div class=\"income-tab-data\" id=\"tab-1\"></div>\n        <div class=\"taxes-tab-data\" id=\"tab-2\"></div>\n      </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city-original":"<header>\n  <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow.png\" alt=\"MoovnOn logo\">\n  </a> \n   <div class=\"title-container\">\n    <h1 class=\"title\">Moovn On</h1>\n    <p class = \"title-motto title-city\"><%- m.city %></p>\n   </div>\n</header>\n\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-md-1-2 city-map-container\"><svg></svg></div>\n    <!--Chart-->\n    <div class=\"pure-u-1 pure-u-md-1-2 city-chart-container\"><p>Chart</p></div>\n      <select id=\"chartType\">\n        <option value=\"housing\" id=\"housing\">Housing</option>\n        <option value=\"income\" id=\"income\">Income</option>\n      </select>\n\n    <!--Lists-->\n      <div class=\"pure-u-1 pure-u-lg-1-1 city-list-container\" id=\"responsiveTabsDemo\">\n        <ul>\n            <li class=\"banks-tab-title\"><a href=\"#tab-1\"> Banks </a></li>\n            <li class=\"taxes-tab-title\"><a href=\"#tab-2\"> Taxes </a></li>\n            <li class=\"local-tab-title\"><a href=\"#tab-3\"> Local Resources </a></li>\n            <li class=\"leisure-tab-title\"><a href=\"#tab-4\"> Popular Leisure </a></li>\n        </ul>\n        <div class=\"banks-tab-data\" id=\"tab-1\"></div>\n        <div class=\"taxes-tab-data\" id=\"tab-2\"></div>\n        <div class=\"local-tab-data\" id=\"tab-3\"></div>\n        <div class=\"leisure-tab-data\" id=\"tab-4\"></div>\n      </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city-people":"","city-template-2":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <h2 class = \"city-title\"><%- m.city %></h2>\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 duo-1\">\n      One\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 duo-2\">\n    two\n    </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city-template-4-map":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <h2 class = \"city-title\"><%- m.city %></h2>\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-1\">\n      <svg id=\"d3-graphs\"></svg>\n      One\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-2\">\n    two\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-3\">\n    three\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-4\"> \n    four\n    </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city-template-4":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <h2 class = \"city-title\"><%- m.city %></h2>\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-1\">\n      One\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-2\">\n    two\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-3\">\n    three\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-4\"> \n    four\n    </div> \n  </div>\n\n \n\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n\n<div class=\"city-all-container\">\n  <h2 class = \"city-title\"><%- m.city %></h2>\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 city-map-container\"><svg id=\"d3-graphs\"></svg></div>\n    <!--Chart-->\n    <div class=\"pure-u-1 pure-u-lg-1-2 city-chart-container\"><p>Chart</p></div>\n      <!--<select id=\"chartType\">\n        <option value=\"housing\" id=\"housing\">Housing</option>\n        <option value=\"cell\" id=\"cell\">Cell Providers</option>\n        <option value=\"demographics\" id=\"demographics\">Demographics</option>\n        <option value=\"income\" id=\"income\">Income</option>\n      </select>-->\n\n    <!--Lists-->\n      <div class=\"pure-u-1 pure-u-lg-1-1 tab-list-container\" id=\"responsiveTabsDemo\">\n        <ul>\n            <li class=\"banks-tab-title\"><a href=\"#tab-1\"> Banks </a></li>\n            <li class=\"taxes-tab-title\"><a href=\"#tab-2\"> Taxes </a></li>\n            <li class=\"local-tab-title\"><a href=\"#tab-3\"> Local Resources </a></li>\n            <li class=\"leisure-tab-title\"><a href=\"#tab-4\"> Popular Leisure </a></li>\n        </ul>\n        <div class=\"banks-tab-data\" id=\"tab-1\"></div>\n        <div class=\"taxes-tab-data\" id=\"tab-2\"></div>\n        <div class=\"local-tab-data\" id=\"tab-3\"></div>\n        <div class=\"leisure-tab-data\" id=\"tab-4\"></div>\n      </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city3-UI":"<!--side bar-->\n<div class = \"side-nav-container\" id=\"tabs\">\n  <ul class=\"side-nav-list\">\n    <div class=\"logo-container\">\n      <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow-white.png\" alt=\"MoovnOn logo\">\n      </a> \n       <div class=\"title-container\">\n        <h1 class=\"title\">Moovn On</h1>\n        <p class = \"title-motto title-city\"><%- m.city %></p>\n       </div>\n    </div>\n\n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-1\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-usd side-icon\"></i>\n          Cost of Living \n        </a>\n      </li>\n      \n      <div id=\"tabs-1\">\n        <h2>Its expensive</h2>\n       </div>\n          \n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-2\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-laptop side-icon\"></i>\n          Internet Providers \n        </a>\n      </li>\n      \n      <div id=\"tabs-2\">\n        <h2>Because the internet</h2>\n      </div>\n    \n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-3\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-mobile side-icon\"></i>\n          Cell Coverage\n        </a>\n      </li>\n      \n      <div id=\"tabs-3\">\n        <h2>Can you here me now?</h2>\n      </div>\n    \n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-4\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-building side-icon\"></i>\n          Industry\n        </a>\n      </li>\n      \n      <div id=\"tabs-4\">\n        <h2>Work!</h2>\n      </div>\n      \n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-5\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-book side-icon\"></i>\n          Education\n        </a>\n      </li>\n      \n      <div id=\"tabs-5\">\n        <h2>Learn!</h2>\n      </div>\n      \n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-6\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-money side-icon\"></i>\n          Taxes\n        </a>\n      </li>\n      \n      <div id=\"tabs-6\">\n        <h2>The gov't gotta get some!</h2>\n      </div>\n      \n      <li class=\"side-nav-item\">\n        <a href=\"#tabs-7\" class=\"side-nav-item-container\">\n          <i class=\"fa fa-male side-icon\"></i>\n          Demographics\n        </a>\n      </li>\n      \n      <div id=\"tabs-7\">\n        <h2>People are everywhere</h2>\n      </div>\n\n   </ul>\n</div>\n","not-found":"<h1>404 Not found!</h1>","search":"<!-- Possible alert bar -->\n<!-- <div id=\"alert\">\n    <a class=\"alert\" href=\"#alert\">This is a slide down alert!</a>\n</div>\n -->\n<header class=\"header-home\">\n  <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow.png\" alt=\"MoovnOn logo\">\n  </a> \n   <div class=\"title-container\">\n    <h1 class=\"title\">Moovn On</h1>\n    <p class = \"title-motto title-city\">Find Greener Pastures</p>\n   </div>\n</header>\n<div class =\"search-page-container\">\n  \n  <form class=\"pure-form search-form search-form-searchView\">\n    <div class=\"sub-title-container\">\n      <h1 class=\"sub-title\">Move Better</h1>\n      <p>Unbiased info about where you're going</p>\n    </div>\n    <input class=\"search-city search-city-searchView\" id=\"tags\" placeholder=\"Enter city\" autofocus>\n    <input class=\"search-city-comp hidden\" id=\"tags2\" placeholder=\"City to compare\">\n    <button class=\"submit pure-button\">Search\n    </button>\n    <!--<button class=\"compare pure-button\">Compare</button>-->\n  </form>\n  \n  <div class=\"map-container\">\n    <img class = \"map-image\" src=\"static/img/Blank-US-Map.svg.png\" alt=\"United States Map\">  \n  </div>\n  \n  <div class=\"pure-g flow-container\">\n    <div class=\"pure-u-1 pure-u-sm-1-3 flow\">\n      <img class= \"flow-icon\" src=\"static/img/open-icon/pie-chart.svg\">\n      Find the info you need\n    </div>\n    <div class=\"pure-u-1 pure-u-sm-1-3 flow\">\n      <img class= \"flow-icon\" src=\"static/img/open-icon/compass.svg\">\n      for wherever you're moving\n    </div>\n    <div class=\"pure-u-1 pure-u-sm-1-3 flow\">\n      <img class= \"flow-icon\" src=\"static/img/open-icon/map.svg\">\n      in every city in America.\n    </div>\n  </div>\n\n</div>","side-bar-city-search":"\n<!--side bar-->\n<div class = \"side-nav-container\">\n  <ul class=\"side-nav-list\">\n    <div class=\"logo-container\">\n      <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow-white.png\" alt=\"MoovnOn logo\">\n      </a> \n       <div class=\"title-container\">\n        <h1 class=\"title\">Moovn On</h1>\n        <p class = \"title-motto title-city\">Find Greener Pastures</p>\n       </div>\n    </div>\n\n    <a href=\"#search/<%- m %>/housing\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-home side-icon\"></i>\n        HOUSING \n      </li>\n    </a> \n    \n    <a href=\"#search/<%- m %>/internet\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-laptop side-icon\"></i>\n        INTERNET & CELL\n      </li>\n    </a>\n        \n    <a href=\"#search/<%- m %>/people\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-male side-icon\"></i>\n        PEOPLE\n      </li>\n    </a>\n    \n    <a href=\"#search/<%- m %>/transportation\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-car side-icon\"></i>\n        TRANSPORTATION\n      </li>\n    </a>\n    \n    <a href=\"#search/<%- m %>/industry\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-building side-icon\"></i>\n        INDUSTRY\n      </li>\n      </a>\n      \n    <a href=\"#search/<%- m %>/jobs\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-briefcase side-icon\"></i>\n        JOBS\n      </li>\n    </a>\n    \n    <a href=\"#search/<%- m %>/taxes\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-money side-icon\"></i>\n        TAXES\n      </li>\n    </a>\n    \n    <a href=\"#search/<%- m %>/leisure\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-beer side-icon\"></i>\n        LEISURE\n      </li>\n    </a>\n    \n    <a href=\"#search/<%- m %>/education\" class = \"side-nav-item-container\">\n      <li class=\"side-nav-item\">\n        <i class=\"fa fa-book side-icon\"></i>\n        EDUCATION\n      </li>\n     </a>\n    \n    <form class=\"search-form search-form-city-view\">\n      <button class=\"submit submit-city-view\">Search\n        </button>\n      <input class=\"search-city search-city-view\" id=\"tags\" placeholder=\"Search another city\" autofocus>\n      <input class=\"search-city-comp hidden\" id=\"tags2\" placeholder=\"City to compare\">\n    </form>\n    \n   </ul>\n   \n     \n</div>","content/tabs-lists":"<div class = \"tab-list-container\" id=\"responsiveTabsDemo\">\n  <ul>\n    <li class=\"banks-tab-title\"><a href=\"#tab-1\"> Banks </a></li>\n    <li class=\"taxes-tab-title\"><a href=\"#tab-2\"> Taxes </a></li>\n    <li class=\"local-tab-title\"><a href=\"#tab-3\"> Local Resources </a></li>\n    <li class=\"leisure-tab-title\"><a href=\"#tab-4\"> Popular Leisure </a></li>\n  </ul>\n  <div class=\"banks-tab-data\" id=\"tab-1\"></div>\n    <div class=\"taxes-tab-data\" id=\"tab-2\"></div>\n    <div class=\"local-tab-data\" id=\"tab-3\"></div>\n    <div class=\"leisure-tab-data\" id=\"tab-4\"></div>\n</div>"};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
