/*
  This widget registers a listener for "showList" .
  It takes the given value displays the results.
*/
UIRPC.list = function(){
  
  displayList = function(data){
    var markup = $("<ul/>");
    for(var i=0;i<data.length;i++){
      var legislator = data[i].legislator;
      markup.append("<li>"+legislator.firstname+" "+legislator.lastname+"</li>");
    }
    $(".list").html(markup);
  };
  
  return {
    
    init: function(location, options) {
      
      pmrpc.register({
        publicProcedureName: "showList",
        procedure: function (data) {
          displayList(data);
        },
        isAsynchronous: false
      });
      
    } 
    
  }; 
  
}();