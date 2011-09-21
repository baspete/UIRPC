UIRPC.calculator = function(){
  
  var transformData = function(data, cb) {
    var newData = data.toLowerCase();
    cb(newData);
  }
  
  return {
    init: function(options) {
      pmrpc.register({
        publicProcedureName: "calculateTestMessage",
        procedure: function (data, cb) {
          transformData(data, cb);
        },
        isAsynchronous: true
      });
    }
  };
  
}();