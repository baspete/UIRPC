UIRPC.facebook_auth = function(){

  // private
  var appID = '252304731480867';

  return {

     displayUser: function(user){
      var userName = document.getElementById('userName');
      var greetingText = document.createTextNode('Greetings, '
                       + user.name + '.');
      userName.appendChild(greetingText);
    },
    
    init: function(location, options) {
      if (window.location.hash.length == 0) {
        var path = 'https://www.facebook.com/dialog/oauth?';
        var queryParams = ['client_id=' + appID,
          'redirect_uri=' + window.location,
          'response_type=token'];
        var query = queryParams.join('&');
        var url = path + query;
        window.open(url);
      } else {
        var accessToken = window.location.hash.substring(1);
        var path = "https://graph.facebook.com/me?";
        var queryParams = [accessToken, 'callback=UIRPC.facebook_auth.displayUser'];
        var query = queryParams.join('&');
        var url = path + query;

        // use jsonp to call the graph
        var script = document.createElement('script');
        script.src = url;
        document.body.appendChild(script);        
      }
      
    } // end init

  }
  
}();

