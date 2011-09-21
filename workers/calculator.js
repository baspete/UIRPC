/*
  This worker registers the procedure "calculateTestMessage".
  When called, it transforms the given value into lowercase
  and returns it via the callback
*/
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