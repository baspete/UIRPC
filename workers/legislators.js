/*
  This worker polls the sunlight labs congress API and returns results as JSON
*/
processData = function(data) {
  console.log("sunlight response: ",data);
}

UIRPC.legislators = function(){
  
  var apiKey = "7efa89de59164c85aaff5cc5774df43f";
  var baseUrl = "http://services.sunlightlabs.com/api/";
  var method = "legislators.getList.json";

  var serviceUrl = baseUrl + method + "?apikey=" + apiKey;
  
  var getLegislators = function(params) {
    $.ajax({
      url: serviceUrl,
      data: params,
      dataType: 'jsonp',
      cache: true,
      jsonp: 'jsonp',
      success: function(data) {
        console.log("received from remote host: ",data.response.legislators);
        pmrpc.call({
          destination : window,
          publicProcedureName : "event",
          params : {
            data: {
              eventName: "LEGISLATORS_CHANGED",
              data: data.response.legislators
            }
          }
        });
      }
    });
  };
  
  return {
    
    init: function(options) {
      
      pmrpc.register({
        publicProcedureName: "getLegislators",
        procedure: function (data) {
          console.log("legislators widget received ",data)
          getLegislators(data);
        },
        isAsynchronous: true
      });
    }
  };
  
}();