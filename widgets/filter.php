<script>
UIRPC.filter = function() {
  
  // private
  var refresh = function(){
    pmrpc.call({
      destination : window,
      publicProcedureName : "displayData",
      params : {
        data : {
          action: "display",
          params: {
            sortBy: {
              field: "lastName",
              order: "ascending"
            },
            filter: {
              age: {min:0,max:100},
            }
          }
        }
      },
      onSuccess: function(cb) {
        console.log("Yay, " + cb.status + "! ", cb.returnValue)
      },
      onError: function(cb) {
        console.log("Oh noes, " + cb.status + "! ", cb.returnValue)
      }
    });
  };
  
  return {
    
    // public
    init: function() {
      refresh();
    }

  }; // end return
  
}();
</script>