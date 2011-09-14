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
</head>
<body>


<?php
// PAGE COMPONENTS
include 'widgets/list.php';
include 'widgets/filter.php';
?>

<script>
// INITIALIZE COMPONENTS
 $(document).ready(function(){
   var people = Object.create(UIRPC.list);
   people.init();
   var peopleFilter = Object.create(UIRPC.filter);
   peopleFilter.init();
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