var c3 = require('c3');
var $ = require('jquery');

module.exports = function(state, city, job) {

	$.ajax({
    method: 'GET',
    url: 'api/salary/' + state + '/' + city + '/' + job
  }).done(function(data){
    console.log(data);
    console.log(data[job+"90th"]);
    c3.generate({
       bindto: '.tri-1',
        data: {
            columns: [
                ['data', data[job+"25th"], data[job+"50th"], data[job+"75th"], data[job+"90th"] ],
            ],
            types: {
                data1: 'area',
                data2: 'area-spline'
            }
        }
    });
  });

console.log(state);
console.log(city);
console.log(job);



};