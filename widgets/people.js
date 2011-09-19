/*
people worker - returns a list of people

  filter {
    sortBy: {
     key: [age, firstName, lastName],
     order: [a, d]
    },
    age: {
      from: <value>,
      to: <value>
    }
  }

  cb.returnValue: <peopleList>

*/
UIRPC.people = function() {
  
  // private properties and methods

  var peopleList = [
    {firstName:"Pete",lastName:"Butler",age:"44"},
    {firstName:"John",lastName:"Smith",age:"43"},
    {firstName:"Mike",lastName:"Jones",age:"42"},
    {firstName:"Bill",lastName:"Smith",age:"41"},
    {firstName:"Steve",lastName:"Johnson",age:"40"},
    {firstName:"Allen",lastName:"Jones",age:"39"},
  ];
  
  return {
    
    // public properties & methods
    procedureName: "getPeople",
    asynchronous: true,
    
    getPeople: function(){
      return peopleList;
    },
    
    init: function(location, options) {

      // register the object
      pmrpc.register({
        publicProcedureName: this.procedureName,
        procedure: function (data, cb) { 
          console.log("people worker received: ", data);

          // this is onSuccess.returnValue
          cb(peopleList);

        },
        isAsynchronous: this.asynchronous
      });

    }

  }; // end return
  
}();
