/*
  Upon initialization, this widget calls the 
  global event handler with the eventName "TEST_MESSAGE_CREATED" 
  and pastes the results into the .talker <div>
*/
UIRPC.talker = function(){

  var displayMessage = function(data) {
    $(".talker").text("I got back: "+data);
  };

  return {
    
    init: function(location, options) {
      
      var eventName = "TEST_MESSAGE_CREATED";
      var data = "HeLlO ThErE";
      
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
          console.log("talker widget called event with: ",data," and succeded with returnValue: ", returnObj.returnValue);
          displayMessage(returnObj.returnValue)
        },
        onError: function(returnObj) {
          console.log("talker widget error: ", returnObj);
        }
      });
      
      
    }
  };
  
}();