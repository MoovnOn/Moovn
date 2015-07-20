var $ = require('jquery');

module.exports = function(state, city, element) { 

//taxes
  var zipRegex = /\b\d{5}\b/g;
   
   var client = new XMLHttpRequest();
      client.open("GET", "http://api.zippopotam.us/us/" + state + "/" + city, true);
      client.onreadystatechange = function () {
        if(client.readyState == 4) {
      		var response = client.responseText;
          var zipArr = response.match(zipRegex);
          var zip = zipArr[0];
          var taxAPIKey = "mZ%2B6%2Bz8d%2B%2FlemJE9aFq4nKKnllHyjnV6dxQubPKpTX2X0dGNDGa6OrsVBIKAKyQDWPd%2FC7HqWhEC%2F2Aq41Ybew%3D%3D"
            $.ajax({
              method: 'GET',  
              url:'https://taxrates.api.avalara.com:443/postal?country=usa&postal=' + zip + '&apikey=' + taxAPIKey 
            }).done(function (result){
              
              var nameArr = [];
              for (var index = 0; index < result.rates.length; index++) {
                nameArr.push(result.rates[index].name)
              }
              
              var rateArr = [];
              for (var index = 0; index < result.rates.length; index++) {
                rateArr.push(result.rates[index].rate)
              }
              
               nameArr.forEach(function(e, i) {
                $(element).append(nameArr[i] + " ");
                $(element).append(rateArr[i] + "%<br><br>");
               });
               
               $(element).append("<b>Total Sales Tax Rate = " + result.totalRate + "%<br></b>");
               
            })          
          
      	};
      };
      client.send();
};