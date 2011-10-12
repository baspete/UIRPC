/* Global event handler 

  When a widget event happens, that widget does a pmrpc.call() to this worker.
  The event is then dispatched to the subscibers as defined in UIRPC.events.
  If a callback is provided, that callback is executed upon a successful 
  completion of the pmrpc.call() method.
  
  API:
  
  publicProcedureName: "event"
  params : {
    data: {
      eventName: <event name>,
      data: <data object (map)>
    }
  }
  
*/
UIRPC.event = function() {
  
  var dispatchEvent = function(eventName, data){
    console.log("event received: ",eventName);
    for(var i=0;i<UIRPC.events[eventName].length;i++){
      var procedureName = UIRPC.events[eventName][i];
      pmrpc.call({
        destination : window,
        publicProcedureName : procedureName,
        params : {
          data: data
        }
      });
    }
  };

  return {
    init: function(options) {
      pmrpc.register({
        publicProcedureName: "event",
        procedure: function (data) {
          dispatchEvent(data.eventName, data.data);
        },
        isAsynchronous: false
      });
    }
  };
  
}();
