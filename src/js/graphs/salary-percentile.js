var c3 = require('c3');
var $ = require('jquery');

module.exports = function(state, city, job) {

	$.ajax({
    method: 'GET',
    url: 'api/salary/' + state + '/' + city + '/' + job
    }).done(function(data){
      console.log(data);
     
     var value10 = data[job+"10th"];
     var value25 = data[job+"25th"];
     var value50 = data[job+"50th"];
     var value75 = data[job+"75th"]; 
     var value90 = data[job+"90th"];
     var max = ((parseInt(value90) / 9) + parseInt(value90));
     console.log(max);
     
     c3.generate({
      bindto: '.gauge25',
      data: {
           columns: [
              ['25th Percentile', data[job+"25th"]], 
          ],
          type: 'gauge',
          onclick: function (d, i) { },
          onmouseover: function (d, i) { },
          onmouseout: function (d, i) { }
          },
          gauge: {
             label: {
                 format: function(value, ratio) {
                     return "$" + value;
                 },
                 show: false // to turn off the min/max labels.
             },
             min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
             max: max, // 100 is default
             units: ' %',
             width: 39 // for adjusting arc thickness
          },
          color: {
              pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
              threshold: {
                 unit: 'value', // percentage is default
                 max: max, // 100 is default
                 values: [value25, value50, value75, value90]
              }
          },
          size: {
              height: 150
          }
      }); 

    c3.generate({
      bindto: '.gauge50',
      data: {
           columns: [
              ['50th Percentile', data[job+"50th"]], 
          ],
          type: 'gauge',
          onclick: function (d, i) { },
          onmouseover: function (d, i) { },
          onmouseout: function (d, i) { }
          },
          gauge: {
             label: {
                 format: function(value, ratio) {
                     return "$" + value;
                 },
                 show: false // to turn off the min/max labels.
             },
             min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
             max: max, // 100 is default
             units: ' %',
             width: 39 // for adjusting arc thickness
          },
          color: {
               pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
              threshold: {
                 unit: 'value', // percentage is default
                 max: max, // 100 is default
                 values: [value25, value50, value75, value90]
              }
          },
          size: {
              height: 150
          }
      }); 

    c3.generate({
      bindto: '.gauge75',
      data: {
           columns: [
              ['75th Percentile', data[job+"75th"]], 
          ],
          type: 'gauge',
          onclick: function (d, i) { },
          onmouseover: function (d, i) { },
          onmouseout: function (d, i) { }
          },
          gauge: {
             label: {
                 format: function(value, ratio) {
                     return "$" + value;
                 },
                 show: false // to turn off the min/max labels.
             },
             min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
             max: max, // 100 is default
             units: ' %',
             width: 39 // for adjusting arc thickness
          },
          color: {
             pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
              threshold: {
                 unit: 'value', // percentage is default
                 max: max, // 100 is default
                 values: [value25, value50, value75, value90]
              }
          },
          size: {
              height: 150
          }
      }); 

    c3.generate({
      bindto: '.gauge90',
      data: {
           columns: [
              ['90th Percentile', data[job+"90th"]], 
          ],
          type: 'gauge',
          onclick: function (d, i) { },
          onmouseover: function (d, i) { },
          onmouseout: function (d, i) { }
          },
          gauge: {
             label: {
                 format: function(value, ratio) {
                     return "$" + value;
                 },
                 show: false // to turn off the min/max labels.
             },
             min: 0, // 0 is default, //can handle negative min e.g. vacuum / voltage / current flow / rate of change
             max: max, // 100 is default
             units: ' %',
             width: 39 // for adjusting arc thickness
          },
          color: {
               pattern: ['#FF0000', '#F97600', '#F6C600', '#60B044'], // the three color levels for the percentage values.
              threshold: {
                 unit: 'value', // percentage is default
                 max: max, // 100 is default
                 values: [value25, value50, value75, value90]
              }
          },
          size: {
              height: 150
          }
      }); 



});
    
  //   c3.generate({
  //      bindto: '.tri-1',
  //       data: {
  //           x: 'x',
  //           columns: [
  //               ['x', '25', '50', '75', '90'],
  //               ['25th', data[job+"25th"]], 
  //               ['50th', data[job+"50th"]], 
  //               ['75th', data[job+"75th"]],
  //               ['90th', data[job+"90th"]]
  //           ],
  //              type: 'bar'
  //        }
  //   });
  // });
}