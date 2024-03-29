/*
List widget - displays a list of things

Registered Methods:

  "displayData" - given a set of params, displays the results in a table

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
      }
    }
  }
  cb.returnValue: <numResults>

*/


UIRPC.list = function(){

  // private
  var populateList = function(data, location) {
    pmrpc.call({
      destination : window,
      publicProcedureName : "event",
      params : {
        data: {
          type: "UPDATE_PEOPLE",
          data: data
        }
      },
      onSuccess: function(cb) {
        console.log("list widget "+cb.status +" with the message : ", cb.returnValue);
        createMarkup(cb.returnValue, location)
      },
      onError: function(cb) {
        console.log("list widget "+cb.status +" with the message : ", cb.returnValue);
      }
    });
  };
  
  var createMarkup =  function(data, location){
    var m = $("<div/>");
    var i;
    var table = $("<table/>");
    var thead = $("<tr>");
    for(i=0;i<categories.length;i++){
      thead.append("<th class='"+categories[i].class+"'>"+categories[i].title+"</th>")
    }
    table.append(thead);
    for (i=0;i<data.length;i++){
      table.append("<tr><td>"+data[i].firstName+"</td><td>"+data[i].lastName+"</td><td>"+data[i].age+"</td></tr>")
    }
    m.append(table);
    location.html(m);
  };

  var categories = [
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
  ];

  return {
    
    // public propterties & methods
    procedureName: "displayData",
    asynchronous: true,
    
    init: function(location, options) {
      
      // register the object
      pmrpc.register({
        publicProcedureName: "displayData",
        procedure: function (data, cb) { 
          // console.log("list widget received: ", data);

          // do something with data
//          populateList(data, location)

          // this is onSuccess.returnValue
          cb(populateList(data, location));

        },
        isAsynchronous: this.asynchronous
      });

      
    } // end init
    
  }; // end return
  
}();