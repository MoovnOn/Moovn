require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"views":[function(require,module,exports){
var views={"city-original":"<header>\n  <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow.png\" alt=\"MoovnOn logo\">\n  </a> \n   <div class=\"title-container\">\n    <h1 class=\"title\">Moovn On</h1>\n    <p class = \"title-motto title-city\"><%- m.city %></p>\n   </div>\n</header>\n\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-md-1-2 city-map-container\"><svg></svg></div>\n    <!--Chart-->\n    <div class=\"pure-u-1 pure-u-md-1-2 city-chart-container\"><p>Chart</p></div>\n      <select id=\"chartType\">\n        <option value=\"housing\" id=\"housing\">Housing</option>\n        <option value=\"income\" id=\"income\">Income</option>\n      </select>\n\n    <!--Lists-->\n      <div class=\"pure-u-1 pure-u-lg-1-1 city-list-container\" id=\"responsiveTabsDemo\">\n        <ul>\n            <li class=\"banks-tab-title\"><a href=\"#tab-1\"> Banks </a></li>\n            <li class=\"taxes-tab-title\"><a href=\"#tab-2\"> Taxes </a></li>\n            <li class=\"local-tab-title\"><a href=\"#tab-3\"> Local Resources </a></li>\n            <li class=\"leisure-tab-title\"><a href=\"#tab-4\"> Popular Leisure </a></li>\n        </ul>\n        <div class=\"banks-tab-data\" id=\"tab-1\"></div>\n        <div class=\"taxes-tab-data\" id=\"tab-2\"></div>\n        <div class=\"local-tab-data\" id=\"tab-3\"></div>\n        <div class=\"leisure-tab-data\" id=\"tab-4\"></div>\n      </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city-template-2":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <!--<h2 class = \"pure-u-1 graph-download-title\">User Average Download and Upload Speeds</h2>-->\n    <div class=\"download-title\"></div>\n    <div class=\"pure-u-1 duo-1\"></div>\n    \n    <div class=\"rel-title\"></div>\n    <div class=\"pure-u-1 duo-2\"></div>\n    </div>\n  </div>\n\n\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>\n    <!--<div class=\"pure-u-1 duo-2\" id=\"google-map\">\n    </div>-->\n","city-template-3":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n\n  <div class=\"pure-g\">\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 tri-1\">\n    <h2 class = \"salary-title\"></h2>\n      <form class=\"industry-form pure-form\">\n        <input type=\"text\" class=\"job-input\" id=\"job-input\" placeholder=\"Search A Job\">\n        <button class = \"pure-button\" type=\"submit\">Submit</button>\n      </form>\n      <div id=\"plotdiv\">\n        <svg id=\"boxplot\"></svg>\n      </div>\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2\">\n        <h2 class = \"income-title\">Median Income of Residents in <%- m.city %> </h2>\n        <div class = \"tri-3\"></div>\n    </div>\n\n    <div class=\"tri-2\">\n      <div class=\"bubble-title\">\n        <h2>Size of Industries in <%- m.city %></h2>\n       </div>\n      <div class = \"bubble-chart pure-u-1-2\"></div>\n    </div>\n\n\n  </div>\n<!-- div for google places -->\n<div id=\"map\"></div>\n</div>\n","city-template-4":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-1\">\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-2\">\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-3\">\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-4\"> \n    </div> \n  </div>\n\n \n\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","city-template-overview":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container city-all-container-overview\">\n  <div class=\"pure-g\">\n    <!--<div class=\"pure-u-1 pure-u-lg-1-1 overview-top\">\n      <h1 class=\"overview-city-title\"><%- m.city %></h1>\n    </div>-->\n\n     <div class=\"pure-u-1 pure-u-md-1-3 overview-cityImg-container-mobile\">\n       <h1 class=\"overview-city-title\"><%- m.city %></h1>\n       <img src=\"static/img/chicago-outline.jpg\" class=\"overview-city-img\">\n     </div>\n\n     <div class=\"pure-u-1 pure-u-md-1-3 overview-tax-container\">\n        <h2 class=\"overview-title\">Sales Tax Rates</h2><br>\n     </div>\n     \n     <div class=\"pure-u-1 pure-u-md-1-3 overview-cityImg-container\">\n       <h1 class=\"overview-city-title\"><%- m.city %></h1>\n       <img src=\"static/img/chicago-outline.jpg\" class=\"overview-city-img\">\n     </div>\n\n      <div class=\"pure-u-1 pure-u-md-1-3 overview-cost-container\">\n        <h2 class=\"overview-title\">Cost of Living Analysis</h2><br>\n      </div>\n    \n    \n    <div class=\"pure-u-1 pure-u-md-1-1 pure-u-lg-1-3 overview-graph-container\">\n      <h2 class=\"graph-title overview-graph-title\">Median Housing Prices</h2>\n      <div class=\"overview-graph2\"></div>\n    </div>\n    \n     <div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 overview-graph-container\">\n      <h2 class=\"graph-title overview-graph-title\">Commute Times For The Area</h2>\n      <div class=\"overview-graph1\"></div>\n    </div>\n    \n    <div class=\"pure-u-1 pure-u-md-1-2 pure-u-lg-1-3 overview-graph-container\">\n      <h2 class=\"graph-title overview-graph-title\">Median Income For The Area</h2>\n      <div class=\"overview-graph3\"></div> \n    </div> \n    \n  </div>\n\n</div>","city-template-vertical":"<div class=\"comp-header\">\n  <div class=\"comp-logo-container\">\n      <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo comp-logo\" src=\"static/img/logo-large-cow.png\" alt=\"MoovnOn logo\">\n      </a> \n<!--        <div class=\"title-container\">\n        <h1 class=\"title\">Moovn On</h1>\n        <p class = \"title-motto title-city\">Find Greener Pastures</p>\n       </div> -->\n</div>\n\n\n  <div class=\"comp-city-title\"><%- m.city1%></div>\n  <div class=\"comp-city-title\"><%- m.city2%></div>\n</div>\n\n<div class=\"pure-g comp-grid\">\n\n  \n  <!-- <div class=\"pure-u-1-1 duo-1-vert cost-taxes\">\n  \t<div class=\"comp-chart-cont comp-chart1-1\"></div>\n    <div class=\"comp-chart-cont comp-chart2-1\"></div>\t  \n  </div> -->\n\n  <div class=\"pure-u-1-1 comp-graph-title\"><h2 class=\"graph-title\">Comparison Overview</h2></div>\n  <div class=\"pure-u-1-1 duo-1-vert cost-taxes\">\n    <div class=\"comp-chart-cont comp-chart1-2\">\n      <div class=\"comp1-1\"></div>\n      <div class=\"comp1-2\"></div>\n      <p>Sales Tax: </p>\n      <div class=\"comp1-3\"></div>\n    </div>\n    <div class=\"comp-chart-cont comp-chart2-2\">\n      <div class=\"comp2-1\"></div>\n      <div class=\"comp2-2\"></div>\n      <p>Sales Tax: </p>\n      <div class=\"comp2-3\"></div>\n    </div>  \n  </div>\n\n  <div class=\"pure-u-1-1 comp-graph-title\"><h2 class=\"graph-title\">Housing Prices</h2><p>Updated monthly, data availability varies</p></div>\n  <div class=\"pure-u-1-1 duo-1-vert\">\n    <div class=\"comp-chart-cont comp-chart1-3\"></div>\n    <div class=\"comp-chart-cont comp-chart2-3\"></div> \n  </div>\n\n  <div class=\"pure-u-1-1 comp-graph-title\"><h2 class=\"graph-title\">Age Demographics</h2></div>\n  <div class=\"pure-u-1-1 duo-1-vert\">\n    <div class=\"comp-chart-cont comp-chart1-5\"></div>\n    <div class=\"comp-chart-cont comp-chart2-5\"></div> \n  </div>\n  \n  <div class=\"pure-u-1-1 comp-graph-title\"><h2 class=\"graph-title\">Cell Connectivity</h2><p>Updated weekly, data availability varies</p></div>  \n  <div class=\"pure-u-1-1 duo-1-vert\">\n    <div class=\"comp-chart-cont comp-chart1-4\"></div>\n    <div class=\"comp-chart-cont comp-chart2-4\"></div> \n  </div>\n\n</div>","city":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n\n<div class=\"city-all-container\">\n  <h2 class = \"city-title\"><%- m.city %></h2>\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 city-map-container\"><svg id=\"d3-graphs\"></svg></div>\n    <!--Chart-->\n    <div class=\"pure-u-1 pure-u-lg-1-2 city-chart-container\"><p>Chart</p></div>\n\n\n    <!--Lists-->\n      <div class=\"pure-u-1 pure-u-lg-1-1 tab-list-container\" id=\"responsiveTabsDemo\">\n        <ul>\n            <li class=\"banks-tab-title\"><a href=\"#tab-1\"> Banks </a></li>\n            <li class=\"taxes-tab-title\"><a href=\"#tab-2\"> Taxes </a></li>\n\n\n        </ul>\n        <div class=\"banks-tab-data\" id=\"tab-1\"></div>\n        <div class=\"taxes-tab-data\" id=\"tab-2\"></div>\n      </div>\n  \n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>","education-template":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n\n  <div class=\"pure-g\">\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 tri-1-edu\">\n      <!-- <p class=\"school-graph-title\">Choose a neighborhood to view its school</p> -->\n      <div id=\"d3-graphs\"></div>\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 tri-2-edu\">\n      <div class=\"school-info\">\n        <div class=\"school-modal\">\n          <button class=\"school-modal-x close-button\">X</button>\n          <div class=\"school-modal-content\"></div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-1 tri-3-edu\">\n    </div>\n</div>\n\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>\n","housing-template-3":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-1\">\n      <div class=\"neighborhood-select\"></div>\n        <div id=\"d3-graphs\">\n        </div>\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-2 quad-2\">\n      <h2 class=\"graph-title\"></h2>\n      <div class = \"housing-graph\">\n      </div>\n    </div>\n\n    <div class=\"pure-u-1 pure-u-lg-1-1 quad-3\">\n    </div>\n\n\n  </div>\n</div>\n<!-- div for google places -->\n<div id=\"map\"></div>\n","not-found":"<h1>404 Not found!</h1>","people-template":"<button class=\"fa fa-bars bar-menu-icon\"></button>\n<div class=\"city-all-container\">\n  <div class=\"pure-g\">\n    <div class=\"pure-u-1-2 people-left\">\n    </div>\n    <div class=\"pure-u-1-2 people-right\">\n      <h1 class=\"graph-title\">Demographics from US Census</h1>\n      <div class = \"people-top-graph\">\n        </div>\n      <div class = \"people-middle-graph\">\n        </div>\n      <div class = \"people-bottom-graph\">\n        </div>\n    </div>\n  </div>\n</div>\n\n","search":"<!-- Possible alert bar -->\n<!-- <div id=\"alert\">\n    <a class=\"alert\" href=\"#alert\">This is a slide down alert!</a>\n</div>\n -->\n<header class=\"header-home\">\n  <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow.png\" alt=\"MoovnOn logo\">\n\n   <div class=\"title-container title-container-home\">\n    <h1 class=\"title\">Moovn On</h1>\n    <p class = \"title-motto title-city\">Find Greener Pastures</p>\n   </div>\n </a>\n</header>\n<div class =\"search-page-container\">\n\n  <form class=\"pure-form search-form search-form-searchView\">\n    <div class=\"sub-title-container\">\n      <h1 class=\"sub-title\">Move Better</h1>\n      <p>Unbiased info about where you're going</p>\n    </div>\n    <div class=\"search-input-container\">\n      <input class=\"search-city search-city-searchView\" id=\"tags\" placeholder=\"Enter city\" autofocus>\n      <input class=\"search-city-comp hidden\" id=\"tags2\" placeholder=\"City to compare\">\n      <button class=\"search-btn submit pure-button\">Search</button>\n      <p class=\"compare-option\">Or compare two!</p>\n    </div>\n  </form>\n  \n  <div class=\"pure-g flow-container\">\n    <div class=\"pure-u-1 pure-u-sm-1-3 flow\">\n      <i class=\"fa fa-bar-chart flow-icon\"></i>\n      <p class = \"flow-text\">Find the info you need</p>\n    </div>\n    <div class=\"pure-u-1 pure-u-sm-1-3 flow\">\n      <i class=\"fa fa-compass flow-icon\"></i>\n      <p class = \"flow-text\">for wherever you're going</p>\n    </div>\n    <div class=\"pure-u-1 pure-u-sm-1-3 flow\">\n      <i class=\"fa fa-globe flow-icon\"></i>\n      <p class = \"flow-text\">in every city in America.</p>\n    </div>\n  </div>\n  \n  <div class=\"map-container\">\n    <img class = \"map-image\" src=\"static/img/stc-skyline2.png\" alt=\"city skyline\">  \n  </div>\n  \n\n</div>\n\n<div class = \"powered-by-container\">\n  <span class = \"google powered-by\">\n    <img src=\"static/img/powered-by-google-on-white.png\" alt=\"google\" />\n  </span>\n  <!-- <span class = \"glass-door powered-by\">\n    <a href='http://www.glassdoor.com/index.htm'><p>Powered by</p>\n      <img src='http://www.glassdoor.com/static/img/api/glassdoor_logo_80.png' title='Job Search' />\n    </a> -->\n  </span>\n  <span class = \"zillow powered-by\">\n    <img src=\"http://www.zillow.com/widgets/GetVersionedResource.htm?path=/static/logos/Zillowlogo_150x40.gif\" width=\"150\" height=\"40\" alt=\"Zillow Real Estate Search\" />\n  </span>\n</div>\n","side-bar-city-search":"\n  <!--side bar-->\n  <div class = \"side-nav-container\">\n  \n      <div class=\"logo-container\">\n        <a class=\"moovnon-logo-container\" href=\"#search\"><img class = \"moovnon-logo\" src=\"static/img/logo-large-cow-white.png\" alt=\"MoovnOn logo\">\n         <div class=\"title-container\">\n          <h1 class=\"title\">Moovn On</h1>\n          <p class = \"title-motto title-city\">Find Greener Pastures</p>\n         </div>\n       </a> \n      </div>\n      \n            \n      <form class=\"search-form search-form-city-view\">\n        <input class=\"search-city search-city-view\" id=\"tags\" placeholder=\"Search Cities\">\n          <button class=\"submit submit-city-view\" id=\"side-bar-button\"><i class=\"fa fa-search\"></i>\n          </button>\n        <input class=\"search-city-comp hidden\" id=\"tags2\" placeholder=\"City to compare\">\n      </form>\n      \n    <ul class=\"side-nav-list\">\n     <h1 class = \"city-title\"><%- m.city %></h1>\n      \n      <a href=\"#search/<%- m.city %>/overview\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item overview\">\n          <i class=\"fa fa-plane side-icon\"></i>\n          OVERVIEW \n        </li>\n      </a> \n      \n      \n      <a href=\"#search/<%- m.city %>/housing\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item housing\">\n          <i class=\"fa fa-home side-icon\"></i>\n          HOUSING \n        </li>\n      </a> \n      \n      <a href=\"#search/<%- m.city %>/internet\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item internet\">\n          <i class=\"fa fa-mobile side-icon\"></i>\n          CELL\n        </li>\n      </a>\n          \n      <a href=\"#search/<%- m.city %>/people\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item people\">\n          <i class=\"fa fa-users side-icon\"></i>\n          PEOPLE\n        </li>\n      </a>\n      \n      <a href=\"#search/<%- m.city %>/industry\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item industry\">\n          <i class=\"fa fa-briefcase side-icon\"></i>\n          JOBS\n        </li>\n      </a>\n      \n      <a href=\"#search/<%- m.city %>/places\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item leisure\">\n          <i class=\"fa fa-location-arrow side-icon\"></i>\n          PLACES\n        </li>\n      </a>\n      \n      <a href=\"#search/<%- m.city %>/education\" class = \"side-nav-item-container\">\n        <li class=\"side-nav-item education\">\n          <i class=\"fa fa-book side-icon\"></i>\n          EDUCATION\n        </li>\n       </a>\n\n      \n     </ul>\n  </div>\n<div class = \"side-bar-background\">\n</div>","content/place-details":"<button class=\"close-button\">&#10005</button>\n<h1 class = \"detail-title\">\n\t<% if (m.detail.name) { %> \n\t\t<%- m.detail.name %></h1>\n\t<% }; %>\t\n\t<% if (m.detail.formatted_phone_number) { %>\t\n\t\t<p><%- m.detail.formatted_phone_number %></p>\n\t<% }; %>\t\n\t<% if (m.detail.website) { %>\n\t\t<p><a href =\"<%- m.detail.website %>\" target=\"_blank\"><%- m.detail.website %></a></p>\n\t<% }; %>\t\n\t<br>\n\t<% if (m.detail.photos) { %>\t\n\t\t<img src='<%- m.detail.photos[0].getUrl({ 'maxWidth': 400, 'maxHeight': 300 }) %>'>\n\t<% }; %>\n\t<% if (m.detail.reviews) { %>\t\n\t\t<p><b>Reviews</b><p>\n\t\t<br>\n\t\t<% m.detail.reviews.forEach(function(i) { %>\n\t\t\t<p><%- i.text %></p><br>\n\t\t<% }); %>\n\t<% }; %>","content/tabs-lists-education":"<div class =\"tab-list-container\" id=\"responsiveTabsDemo\">\n  <ul>\n    <li class=\"tab-title1\" id=\"title-1\"><a href=\"#tab-1\"></a></li>\n    <li class=\"tab-title2\" id=\"title-2\"><a href=\"#tab-2\"></a></li>\n    <li class=\"tab-title3\" id=\"title-3\"><a href=\"#tab-3\"></a></li>\n  </ul>\n  <div class=\"tab-data1\" id=\"tab-1\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data2\" id=\"tab-2\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data3\" id=\"tab-3\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n<!--  \n    <div class = \"modal-details\">\n        </div>-->\n</div>\n\n\n\n","content/tabs-lists-housing":"<div class =\"tab-list-container\" id=\"responsiveTabsDemo\">\n  <ul>\n    <li class=\"tab-title1\" id=\"title-1\"><a href=\"#tab-1\"></a></li>\n    <li class=\"tab-title2\" id=\"title-2\"><a href=\"#tab-2\"></a></li>\n  </ul>\n  <div class=\"tab-data1\" id=\"tab-1\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data2\" id=\"tab-2\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n\n<!--  \n    <div class = \"modal-details\">\n        </div>-->\n</div>\n\n\n\n","content/tabs-lists-places":"<div class =\"tab-list-container\" id=\"responsiveTabsDemo\">\n  <ul>\n    <li class=\"tab-title1\" id=\"title-1\"><a href=\"#tab-1\"></a></li>\n    <li class=\"tab-title2\" id=\"title-2\"><a href=\"#tab-2\"></a></li>\n    <li class=\"tab-title3\" id=\"title-3\"><a href=\"#tab-3\"></a></li>\n    <li class=\"tab-title4\" id=\"title-4\"><a href=\"#tab-4\"></a></li>\n    <li class=\"tab-title5\" id=\"title-5\"><a href=\"#tab-5\"></a></li>\n    <li class=\"tab-title6\" id=\"title-6\"><a href=\"#tab-6\"></a></li>\n    <li class=\"tab-title7\" id=\"title-7\"><a href=\"#tab-7\"></a></li>\n    <li class=\"tab-title8\" id=\"title-8\"><a href=\"#tab-8\"></a></li>\n  </ul>\n  <div class=\"tab-data1\" id=\"tab-1\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data2\" id=\"tab-2\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data3\" id=\"tab-3\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data4\" id=\"tab-4\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data5\" id=\"tab-5\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data6\" id=\"tab-6\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data7\" id=\"tab-7\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n  <div class=\"tab-data8\" id=\"tab-8\">\n    <div class=\"list-left\"></div>\n    <div class=\"details-right\"></div>\n  </div>\n<!--  \n    <div class = \"modal-details\">\n        </div>-->\n</div>\n\n\n\n"};
if (typeof module !== "undefined" && module.exports) { module.exports = views; }
},{}]},{},[]);
