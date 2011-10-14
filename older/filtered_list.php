<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
  <script src="js/jquery.js"></script>
  <script src="js/jquery.ba-bbq.min.js"></script>	<!-- loaded so we have $.deparam() - don't need all of it, refactor! -->
  <script src="js/pmrpc.js"></script>	 <!-- postmessage syntactic sugar -->
  <script src="js/uirpc.js"></script>
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
<!-- workers -->
<div class="widget event"></div>
<div class="widget people"></div>

<!--containers-->
<div id="left">
  <div id="people_filter" class="widget filter"></div>
</div>
<div id="main">
  <div id="list_people" class="widget list"></div>
</div>

<script>
  UIRPC.createWidgets();
</script>

<script>

  // WHAT SERVICES ARE AVAILABLE?
  /*
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
  */
</script>
</body>
</html>