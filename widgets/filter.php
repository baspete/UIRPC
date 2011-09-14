<style type="text/css">
.filter {
  border: 1px solid #CCCCCC;
  padding: 10px;
}
</style>

<script>
UIRPC.filter = function() {
  
  // private properties and methods
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
    
    // public properties & methods
    
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
    
    createMarkup: function(){
      var m = $("<div/>").addClass("filter");
      // plus a bunch of stuff
      return m;
    },
    
    init: function(location) {

      // create the markup and insert it into the dom
      location.append(this.createMarkup())

      // publish the intial settings
      publish(this.settings, window);
      
    }

  }; // end return
  
}();
</script>