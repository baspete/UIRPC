/*
  Filter Widget
  
  When the values here are changed, this widget calls the
  event "FILTER_CHANGED" with the new values.
*/
UIRPC.filter = function(){
  
  var getFilterCriteria = function() {
    return { state: $("#state").val() };
  };
  
  var states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HA','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];

  var createMarkup = function(){
    var markup = $("<select id='state'/>");
    markup.append("<option>Choose...</option>");
    for (var i=0;i<states.length;i++){
      markup.append("<option>"+states[i]+"</option>")
    }
    $(".filter").html(markup);
  };
  
  var bindFilterEvents = function(){
    $("#state").change(function(){
      pmrpc.call({
        destination : window,
        publicProcedureName : "event",
        params : {
          data: {
            eventName: "FILTER_CHANGED",
            data: getFilterCriteria()
          }
        }
      });
      
    })
  };

  return {
    
    init: function(location, options) {
      createMarkup();
      bindFilterEvents();      
    }

  };
  
}();