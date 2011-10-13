/*
Filter Widget - renders a set of filters

PROCEDURES REGISTERED
---------------------

  none
  
EVENTS DISPATCHED
-----------------

  "FILTER_CHANGED"
  
*/
UIRPC.filter = function(){
  
  var getFilterCriteria = function() {
    var params = {};
    $(".filter").find("input, select").each(function(){
      if($(this).val() !== ""){
        params[$(this).attr("name")] = $(this).val();
      }
    });
    return params;
  };
  
  var states = ['AL','AK','AZ','AR','CA','CO','CT','DE','DC','FL','GA','HA','ID','IL','IN','IA','KS','KY','LA','ME','MD','MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ','NM','NY','NC','ND','OH','OK','OR','PA','RI','SC','SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'];
  
  var createMarkup = function(){
    var statesList = $("<select name='state'/>");
    statesList.append("<option value=''>Any</option>");
    for (var i=0;i<states.length;i++){
      statesList.append("<option>"+states[i]+"</option>")
    }
    $(".filter").append("State: ").append(statesList);
    var chambersList = $("<select name='title'>")
      .append("<option value=''>Any</option>")
      .append("<option value='Sen'>Senate</option>")
      .append("<option value='Rep'>House</option>");
    $(".filter").append("<br>Chamber: ").append(chambersList);
    var partiesList = $("<select name='party'>")
      .append("<option value=''>Any</option>")
      .append("<option value='D'>D</option>")
      .append("<option value='R'>R</option>")
      .append("<option value='I'>I</option>");
    $(".filter").append("<br>Party: ").append(partiesList);
  };
  
  var bindFilterEvents = function(){
    $(".filter").find("input, select").change(function(){
      pmrpc.call({
        destination : window,
        publicProcedureName : "event",
        params : {
          data: {
            eventName: "FILTER_CHANGED",
            data: getFilterCriteria(),
            options: null
          }
        }
      });
      
    })
  };

  return {
    
    init: function() {
      createMarkup();
      bindFilterEvents();      
    }

  };
  
}();