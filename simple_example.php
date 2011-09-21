<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
  <script src="js/jquery.js"></script>
  <script src="js/jquery.ba-bbq.min.js"></script>	<!-- loaded so we have $.deparam() - don't need all of it, refactor! -->
  <script src="js/pmrpc.js"></script>	 <!-- postmessage syntactic sugar -->
  <script src="js/uirpc.js"></script>
</head>
<body>

<!--containers-->
Talker:
<div class="widget talker"></div>
Listener:
<div class="widget listener"></div>

<script>
  UIRPC.createWorkers(["event","calculator"]);
  UIRPC.createWidgets();
</script>
</body>
</html>