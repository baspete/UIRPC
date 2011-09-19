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
        to:43
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
  
  var updateAndPublish = function(map){
    settings = $.extend(true,settings,map);
    publish(settings, window);
  };
  
  return {
    
    // public properties & methods
    
    createMarkup: function(){
      // get the flattened settings map
      var flatSettings = $.flatten(settings);
      // form element markup
      var f = $("<form/>").addClass("filter");
      f.append("Max Age: <input type='text' name='filter[age][to]'  value='"+ flatSettings['filter[age][to]'] +"'/>");
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
