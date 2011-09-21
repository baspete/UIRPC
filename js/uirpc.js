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

// WORKER FACTORY
UIRPC.createWorkers = function(workers){
  $.each(workers, function(i, name) { 
    var options = {}; // TODO: how to populate this usefully?
    $.getScript("workers/"+name+".js",function(){
      console.log("creating "+name+" object");
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
    console.log("creating "+className+" object")
    var widget = Object.create(UIRPC[className])
    widget.init(target, options)
  });
};
UIRPC.createWidgets = function() {
  $(".widget").each(function(){
    UIRPC.createWidget($(this));
  });
};
