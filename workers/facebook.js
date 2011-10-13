/*
This worker polls the facebook api and returns results as JSON

PROCEDURES REGISTERED
---------------------

  "getFacebookInfo" - some facebook data
  data: {
    facebook_id: <facebook id> (required)
  },
  options: {target: <bioguide_id> } (required)
  
EVENTS DISPATCHED
-----------------

  "GET_FACEBOOK_INFO_RESULTS"

*/
UIRPC.facebook = function(){
  
  var getFacebookInfo = function(data, options) {
    
    var avatar_url = "http://graph.facebook.com/"+data.facebook_id+"/picture";
    var wall_url = "http://www.facebook.com/"+data.facebook_id;
    pmrpc.call({
      destination : window,
      publicProcedureName : "event",
      params : {
        data: {
          eventName: "GET_FACEBOOK_INFO_RESULTS",
          data: {
            avatar_url: avatar_url,
            wall_url: wall_url,
            facebook_id: data.facebook_id
          },
          options: options
        }
      }
    });

  };
  
  return {
    
    init: function() {
      
      pmrpc.register({
        publicProcedureName: "getFacebookInfo",
        procedure: function (data, options) {
          getFacebookInfo(data, options);
        },
        isAsynchronous: true
      });

    }

  };
  
}();