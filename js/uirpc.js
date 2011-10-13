// NAMESPACE
var UIRPC = {};

// UTILITY METHODS
// "create" method to allow prototypical inheritance
if(typeof Object.create !== "function"){
  Object.create = function(o){
    var F = function(){};
    F.prototype = o;
    return new F;
  };
}
// create a map of all elements in a form
if(typeof $.mapForm !== "function"){
  $.mapForm = function(form) {
    return $.deparam(form.serialize());
  };
}
// flatten an object to a set of key/value pairs
if(typeof $.flatten !== "function"){
  $.flatten = function(map){
    var s = $.param(map).split("&");
    var flatMap = {};
    for(var i=0;i<s.length;i++){
      var item = s[i].split("=");
      flatMap[unescape(item[0])] = item[1]
    }
    return flatMap;
  };
}
// END UTILITY METHODS

// EVENT DISPATCHER
UIRPC.dispatcher = function() {
  
  var dispatchEvent = function(eventName, data, options){
    // iterate through the subscribers for this event as defined in UIRPC.events[eventName]
    for(var i=0;i<UIRPC.events[eventName].length;i++){
      var procedureName = UIRPC.events[eventName][i];
      console.log("dispatching ",eventName," to ",procedureName," with data: ",data," and options ",options);
      pmrpc.call({
        destination : window,
        publicProcedureName : procedureName,
        params : {
          data: data,
          options: options
        }
      });
    }
  };

  return {
    init: function() {
      pmrpc.register({
        publicProcedureName: "event",
        procedure: function (data) {
          dispatchEvent(data.eventName, data.data, data.options);
        },
        isAsynchronous: false
      });
    }
  };
  
}();

// WORKER FACTORY
UIRPC.createWorkers = function(workers){
  $.each(workers, function(i, name) { 
    var options = {}; // TODO: how to populate this usefully?
    $.getScript("workers/"+name+".js",function(){
      console.log("creating "+name+" worker");
      var worker = Object.create(UIRPC[name]);
      worker.init(options);
    });
  });
}
// WIDGET FACTORY
UIRPC.createWidget = function(target){
  var options = {}; // TODO: how to populate this usefully?
  var classNames = target.attr("class").split(" ");
  var className = classNames[1]; // class name is the second argument -- others are ignored
  $.getScript("widgets/"+className+".js", function(){ // note same origin limitation here
    console.log("creating "+className+" widget")
    var widget = Object.create(UIRPC[className])
    widget.init(target, options)
  });
};
UIRPC.createWidgets = function() {
  $(".widget").each(function(){
    UIRPC.createWidget($(this));
  });
};

// INITIALIZATION
$(document).ready(function(){

  // create the event dispatcher
  Object.create(UIRPC.dispatcher).init();

})
