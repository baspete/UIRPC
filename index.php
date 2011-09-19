<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
  <script src="js/jquery.js"></script>
  <script src="js/jquery.ba-bbq.min.js"></script>	<!-- loaded so we have $.deparam() - don't need all of it, refactor! -->
  <script src="js/pmrpc.js"></script>	 <!-- postmessage syntactic sugar -->
  <script>
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
        
  </script>
  <style type="text/css">
    body {
      font-family: arial, sans-serif;
    }
    #left {
      float: left;
      width: 150px;
    }
    #main {
      margin-left: 160px;
    }
  </style>
</head>
<body>

<!--
<div id="userName" class="widget facebook_auth"></div>
-->

<!-- workers -->
<div class="widget people"></div>

<!--containers-->
<div id="left">
  <div id="people_filter" class="widget filter"></div>
</div>
<div id="main">
  <div id="list_people" class="widget list"></div>
</div>

<script>
  // SIMPLE WIDGET FACTORY
  $(".widget").each(function(){
    var target = $(this);
    var options = {}; // TODO: how to populate this usefully?
    var classNames = target.attr("class").split(" ");
    var className = classNames[1]; // class name is the second argument -- others are ignored
    $.getScript("widgets/"+className+".js", function(){ // note same origin limitation here
      console.log("creating "+className+" object")
      var widget = Object.create(eval("UIRPC."+className))
      widget.init(target, options)
    });
  });
</script>

<script>
  // WHAT SERVICES ARE AVAILABLE?
  $(document).ready(function(){
    pmrpc.discover({
      callback : function(discoveredMethods) {
        var services = [];
        $(discoveredMethods).each(function(){
          services.push(this.publicProcedureName);
        })
        console.log("Services Available:", services);
      }
    });
  })
</script>
</body>
</html>