<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
  <script src="js/jquery.js"></script>
  <script src="js/jquery.ba-bbq.min.js"></script>	<!-- loaded so we have $.deparam() - don't need all of it, refactor! -->
  <script src="js/pmrpc.js"></script>	 <!-- postmessage syntactic sugar -->
  <script src="js/uirpc.js"></script>
  <script>
    // Event dispatcher mapping. TODO: is this the right place for this
    UIRPC.events = {
      TEST_MESSAGE_CREATED: ["showTestMessage"],
      TEST_MESSAGE_CHANGED: ["calculateTestMessage"]
    };
  </script>
</head>
<body>

<!--containers-->
Talker:
<div class="widget talker"></div>

Listener:
<div class="widget listener"></div>

<script>
  // instantiate all the good stuff
  UIRPC.createWorkers(["event","calculator"]);
  UIRPC.createWidgets(); // createWidgets() crawls the dom, so we don't need arguments here
</script>
</body>
</html>