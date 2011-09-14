<style type="text/css">
.filter {
  border: 1px solid #CCCCCC;
  padding: 10px;
}
</style>

<script>
UIRPC.filter = function() {
  
  // private properties and methods

  var settings = {
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
  };
  
  var publish = function(settings, context){
    pmrpc.call({
      destination : context,
      publicProcedureName : "displayData",
      params : {
        data: {
          action: "display",
          settings: settings
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
  
  var updateAndPublish = function(s){
    settings = $.extend(true,settings,s);
    publish(settings, window);
  };
  
  return {
    
    // public properties & methods
    
    createMarkup: function(){
      var f = $("<form/>").addClass("filter");
      // plus a bunch of stuff
      f.append("Min Age: <input type='text' name='filter[age][from]' />");
      var b = $("<input type='button' value='filter'/>").bind("click",function(){
        updateAndPublish($.mapForm(f));
      });
      f.append(b);
      return f;
    },
    
    init: function(location, options) {

      // create the markup and insert it into the dom
      location.append(this.createMarkup());

      // publish the intial settings
      publish(settings, window);
      
    }

  }; // end return
  
}();
</script>