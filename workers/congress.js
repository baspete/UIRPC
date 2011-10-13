/*
This worker polls the sunlight labs congress API and returns results as JSON

PROCEDURES REGISTERED
---------------------

  "getLegislators" - gets a list of legislators filtered by the given arguments
  data: {
    state: <two-letter state name, ie: "AK">,  (optional)
    title: ["Sen", "Rep"],  (optional)
    party: ["D", "R", "I"]  (optional)
  }

  "getCommittees" - gets a list committees/subcommittees for a given legislator
  data: {
    bioguide_id: <bioguide_id> (required)
  },
  options: {target: <bioguide_id> } (required)
  
EVENTS DISPATCHED
-----------------

  "LEGISLATORS_CHANGED"
  "COMMITTEES_CHANGED"

*/
UIRPC.congress = function(){
  
  var apiKey = "7efa89de59164c85aaff5cc5774df43f";
  var baseUrl = "http://services.sunlightlabs.com/api/";
  var legislatorsMethod = "legislators.getList.json";
  var committeesMethod = "committees.allForLegislator";

  var getLegislators = function(params, options) {
    $.ajax({
      url: baseUrl + legislatorsMethod + "?apikey=" + apiKey,
      data: params,
      dataType: 'jsonp',
      cache: true,
      jsonp: 'jsonp', // sunlightlabs needs this to return jsonp
      success: function(data) {
        // console.log("received legislators: ", data.response.legislators);
        pmrpc.call({
          destination : window,
          publicProcedureName : "event",
          params : {
            data: {
              eventName: "LEGISLATORS_CHANGED",
              data: data.response.legislators,
              options: options
            }
          }
        });
      }
    });
  };
  
  var getCommittees = function(params, options) {
    $.ajax({
      url: baseUrl + committeesMethod + "?apikey=" + apiKey,
      data: params,
      dataType: 'jsonp',
      cache: true,
      jsonp: 'jsonp', // sunlightlabs needs this to return jsonp
      success: function(data) {
        // console.log("received committees: ", data.response.committees);
        pmrpc.call({
          destination : window,
          publicProcedureName : "event",
          params : {
            data: {
              eventName: "COMMITTEES_CHANGED",
              data: data.response.committees,
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
        publicProcedureName: "getLegislators",
        procedure: function (data, options) {
          getLegislators(data, options);
        },
        isAsynchronous: true
      });

      pmrpc.register({
        publicProcedureName: "getCommittees",
        procedure: function (data, options) {
          getCommittees(data, options);
        },
        isAsynchronous: true
      });

    }

  };
  
}();