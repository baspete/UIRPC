<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta charset="utf-8" />
  <link rel="stylesheet" href="css/uirpc.css"/>
  <script src="js/jquery.js"></script>
  <script src="js/jquery.ba-bbq.min.js"></script>	<!-- loaded so we have $.deparam() - don't need all of it, refactor! -->
  <script src="js/pmrpc.js"></script>	 <!-- postMessage() syntactic sugar -->
  <script src="js/uirpc.js"></script>
</head>
<body>

<!--containers-->
<div class="widget filter"></div>
<div class="widget list"></div>

<script>
  // Event dispatcher mapping. TODO: is this the right place for this?
  UIRPC.events = {
    FILTER_CHANGED: ["getLegislators","showRetrievingData"],
    LEGISLATORS_CHANGED: ["showLegislators"],
    REQUEST_COMMITTEES: ["getCommittees"],
    GET_COMMITTEES_RESULTS: ["showCommittees"]
  };

  // instantiate workers and widgets
  UIRPC.createWorkers(["congress"]);
  UIRPC.createWidgets(); // createWidgets() crawls the dom, so we don't need arguments here
</script>
</body>
</html>