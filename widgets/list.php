<?php
/*
List widget - displays a list of things

Registered Methods:

action: displayData
params: {
  action: [display, clear],
  parameters: {
    sortBy: [age, firstName, lastName],
    age: {from,to},
    firstName: {from,to},
    lastName: {from,to}
  }
}
cb.returnValue: <numResults>

*/
?>
<script>
UIRPC.list = function(){

  // private
  var doSomething = function(data) {
    console.log("I'm doing something with ", data);
  };

  return {
    
    // public propterties
    procedureName: "displayData",
    asynchronous: true,
    
    // public methods
    init: function() {
      
      // register the object
      pmrpc.register({
        publicProcedureName: "displayData",
        procedure: function (data, cb) { 
          console.log("listener received: ", data);

          // do something with data
          doSomething(data)

          // this is onSuccess.returnValue
          cb("this is the callback text");

        },
        isAsynchronous: this.asynchronous
      });

      
    } // end init
  }; // end return
  
}();
</script>