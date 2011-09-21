UIRPC.events = {
  CHANGE_FILTER_PARAMS: ["displayData"],
  UPDATE_PEOPLE: ["getPeople"],
  TEST_MESSAGE_CREATED: ["showTestMessage"],
  TEST_MESSAGE_CHANGED: ["calculateTestMessage"]
};
UIRPC.event = function() {
  
  var dispatchEvent = function(eventName, data, cb){
    console.log("event received: ",eventName);
    for(var i=0;i<UIRPC.events[eventName].length;i++){
      var procedureName = UIRPC.events[eventName][i];
      pmrpc.call({
        destination : window,
        publicProcedureName : procedureName,
        params : {
          data: data
        },
        onSuccess: function(returnObj) {
          console.log("event handler called "+ procedureName +" and succeded with returnValue: ", returnObj.returnValue);
          cb(returnObj.returnValue);
        },
        onError: function(returnObj) {
          console.log("event handler error: ", returnObj);
        }
      });
    }
  };

  return {
    init: function(location, options) {
      pmrpc.register({
        publicProcedureName: "event",
        procedure: function (data, cb) {
          dispatchEvent(data.eventName, data.data, cb);
        },
        isAsynchronous: true
      });
    }
  };
  
}();
