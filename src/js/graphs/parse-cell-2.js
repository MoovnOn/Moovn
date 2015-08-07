$ = require('jquery');

module.exports = function(data) {

    data.forEach(function(e){

        if($(e).attr('type3G') === undefined) {
          $(e).attr('type3G', {});
        }

        if(!e.type3G.uploadSpeed){
          e.type3G.uploadSpeed = undefined;
        }
        if(!e.type3G.downloadSpeed){
          e.type3G.downloadSpeed = undefined;
        }
        if(!e.type3G.reliability){
          e.type3G.reliability = undefined;
        }
        if(!e.type4G.uploadSpeed){
          e.type4G.uploadSpeed = undefined;
        }
        if(!e.type4G.downloadSpeed){
          e.type4G.downloadSpeed = undefined;
        }
        if(!e.type4G.reliability){
          e.type4G.reliability = undefined;
        }
        return data;
      })
    return data;

  }  