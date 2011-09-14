<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
  <script src="js/jquery.js"></script>
  <script src="js/pmrpc.js"></script>	
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


<?php
// PAGE COMPONENTS
include 'widgets/list.php';
include 'widgets/filter.php';
?>

<!--containers-->
<div id="left"></div>
<div id="main"></div>

<script>
// INITIALIZE COMPONENTS
 $(document).ready(function(){
   var peopleFilter = Object.create(UIRPC.filter);
   peopleFilter.init($("#left"));
   var people = Object.create(UIRPC.list);
   people.init($("#main"));
 });
</script>

<script>
  // WHAT SERVICES ARE AVAILABLE?
  pmrpc.discover({
    callback : function(discoveredMethods) {
      var services = [];
      $(discoveredMethods).each(function(){
        services.push(this.publicProcedureName);
      })
      console.log("Services Available:", services);
    }
  });
</script>
</body>
</html>