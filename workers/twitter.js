/*
This worker polls the twitter api and returns results as JSON

PROCEDURES REGISTERED
---------------------

  "getTwitterInfo" - some twitter data
  data: {
    twitter_id <twitter id> (required)
  },
  options: {target: <bioguide_id> } (required)
  
EVENTS DISPATCHED
-----------------

  "GET_TWITTER_INFO_RESULTS"

*/
UIRPC.twitter = function(){
  
  var getTwitterInfo = function(data, options) {
    console.log("getting twitter info for ", data.twitter_id);
    $.ajax({
      url: "https://api.twitter.com/1/statuses/user_timeline.json",
      data: {
        include_entities: true,
        exclude_replies: true,
        include_rts: true,
        count: 3,
        screen_name: data.twitter_id
      },
      dataType: 'jsonp',
      cache: true,
      success: function(response) {
        pmrpc.call({
          destination : window,
          publicProcedureName : "event",
          params : {
            data: {
              eventName: "GET_TWITTER_INFO_RESULTS",
              data: response,
              options: options
            }
          }
        });
      }
    });
  };
  
  return {
    
    init: function() {
      
      pmrpc.register({
        publicProcedureName: "getTwitterInfo",
        procedure: function (data, options) {
          getTwitterInfo(data, options);
        },
        isAsynchronous: true
      });

    }

  };
  
}();