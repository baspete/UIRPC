<?php
/*
List widget - displays a list of things

Registered Methods:

action: displayData
params: {
  action: [display, clear],
  settings: {
    sortBy: {
     key: [age, firstName, lastName],
     order: [a, d]
    },
    age: {
      from: <value>,
      to: <value>
    },
    firstName: {
      from: <value>,
      to: <value>
    },
    lastName: {
      from: <value>,
      to: <value>
    }
  }
}
cb.returnValue: <numResults>

*/
?>
<style type="text/css">
.list {
  border: 1px solid #CCCCCC;
  padding: 10px;
}
</style>

<script>
UIRPC.list = function(){

  // private
  var doSomething = function(data) {
    var paramed = unescape($.param(data));
    console.log("do something with ", paramed);
  };

  return {
    
    // public propterties & methods
    procedureName: "displayData",
    asynchronous: true,
    
    categories: [
      {
        "title":"First Name",
        "class":"firstName"
      },
      {
        "title":"Last Name",
        "class":"lastName"
      },
      {
        "title":"Age",
        "class":"age"
      }
    ],
    
    createMarkup: function(){
      var m = $("<div/>").addClass("list");
      var table = $("<table/>");
      var thead = $("<tr>");
      for(var i=0;i<this.categories.length;i++){
        thead.append("<th class='"+this.categories[i].class+"'>"+this.categories[i].title+"</th>")
      }
      table.append(thead);
      m.append(table);
      return m;
    },
    
    init: function(location, options) {
      
      // create the markup and insert it into the dom
      location.append(this.createMarkup())
      
      // register the object
      pmrpc.register({
        publicProcedureName: this.procedureName,
        procedure: function (data, cb) { 
          console.log("listener received: ", data);

          // do something with data
          doSomething(data)

          // this is onSuccess.returnValue
          cb("this is the callback text");

        },
        isAsynchronous: this.asynchronous
      });

      
    } // end init
    
  }; // end return
  
}();
</script>