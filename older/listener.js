/*
  This widget registers a listener for "showTestMessage" .
  It takes the given value and calls the global event
  handler with the eventName "TEST_MESSAGE_CREATED". 
  It passes the returned value back to the callback.
  
*/
UIRPC.listener = function(){
  
  // Call a worker to transofrm the message. Pass the 
  // returned value to the callback provided.
  var calculateMessage = function(data, cb) {
    // edit the markup
    $(".listener").text("I received: "+data);
    // call for help
    var eventName = "TEST_MESSAGE_CHANGED";
    pmrpc.call({
      destination : window,
      publicProcedureName : "event",
      params : {
        data: {
          eventName: eventName,
          data: data
        }
      },
      onSuccess: function(returnObj) {
        console.log("listener widget called event with: ",data," and succeded with returnValue: ", returnObj.returnValue);
        cb(returnObj.returnValue)
      },
      onError: function(returnObj) {
        console.log("listener widget error: ", returnObj);
      }
    });  
  };
  
  return {
    
    init: function(location, options) {
      
      pmrpc.register({
        publicProcedureName: "showTestMessage",
        procedure: function (data, cb) {
          calculateMessage(data, cb);
        },
        isAsynchronous: true
      });

      
    } // end init
    
  }; // end return
  
}();