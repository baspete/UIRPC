UIRPC PROJECT
   
Purpose behind this project is to try a development model which 
encourages front-end developers to thinkfirst about interactions, 
events and states, before thinking about presentation. 

The experiment here is to see if a pub/sub model in which widgets
communicate with each other via their message (procedure) APIs provides
that encouragement. The development workflow should go something like:

1. Developer works with product/design team to enumerate and define
all interactions and states in a web application. 

2. Developer identifies widgets and workers based on that functionality.

3. Developer defines interfaces for each widget, ie: events it broadcasts, 
and public procedures (with their message formats) it registers. 

4. Developer builds widgets according to those interface definitions. 

5. Developer writes widget tests to verify correct behavior.

6. Developer focuses on look and feel.


In this project we'll use HTML5's postMessage() api to handle 
inter-widget communication. The idea is to create an entirely 
message-driven front end, with widgets being in charge of their 
own markup, event bindings, etc. 

The basic interaction is as follows: 

1. One or more widgets are instantiated on a page at load time. Each 
widget registers zero or more public procedures.

2. Something happens (user input, etc) within a widget. That widget 
broadcasts an event to the global event dispatcher.

3. The event dispatcher looks in the event mapping table (which is 
unique to the page) to determine which public procedures it should send 
the event data to. It then calls each of those procedures in turn and,
passing along the data and options received in the original event.

4. The widget(s) whose public procedures were called act upon the data, 
possibly resulting in new event broadcasts.


