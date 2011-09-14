<script>
UIRPC.filter = function() {
  
  // private
  var publish = function(settings, context){
    pmrpc.call({
      destination : context,
      publicProcedureName : "displayData",
      params : settings,
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
    
    settings: {
      data : {
        action: "display",
        params: {
          sortBy: {
            key: "lastName",
            order: "a"
          },
          filter: {
            age: {
              from:0,
              to:100
            }
          }
        }
      }
    },
    
    init: function() {
      publish(this.settings, window);
    }

  }; // end return
  
}();
</script>