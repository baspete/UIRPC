UIRPC.listener = function(){
  
  // modify the data somewhere else
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
  
  // ... or do it here
  var displayMessage = function(data, cb) {
    $(".listener").text("I received: "+data);
    var newData = data.toLowerCase();
    cb(newData);
  };
  
  return {
    
    init: function(location, options) {
      
      pmrpc.register({
        publicProcedureName: "showTestMessage",
        procedure: function (data, cb) {
          calculateMessage(data, cb);
          // displayMessage(data, cb); 
        },
        isAsynchronous: true
      });

      
    } // end init
    
  }; // end return
  
}();