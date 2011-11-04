/*

This widget displays a list of legislators

PROCEDURES REGISTERED
---------------------

  "showLegislators" - Renders an array of legislators based on the api at http://services.sunlightlabs.com/docs/congressapi/legislators.get(List)/
  Typical example below:
  data:  [
    {"legislator": {
      bioguide_id: "F000444",
      birthdate: "1962-12-31",
      chamber: "house",
      congress_office: "240 Cannon House Office Building",
      congresspedia_url: "http://www.opencongress.org/wiki/Jeff_Flake",
      crp_id: "N00009573",
      district: "6",
      email: "",
      eventful_id: "",
      facebook_id: "congressmanjeffflake",
      fax: "202-226-4386",
      fec_id: "H0AZ01184",
      firstname: "Jeff",
      gender: "M",
      govtrack_id: "400134",
      in_office: true,
      lastname: "Flake",
      middlename: "",
      name_suffix: "",
      nickname: "",
      official_rss: "",
      party: "R",
      phone: "202-225-2635",
      senate_class: "",
      state: "AZ",
      title: "Rep",
      twitter_id: "JeffFlake",
      votesmart_id: "28128",
      webform: "http://www.house.gov/writerep",
      website: "http://flake.house.gov/",
      youtube_url: "http://www.youtube.com/flakeoffice"
    }}
  ],
  options: null
  
  "showCommittees" - display a legislator's committee membership(s)
  data: [
    {committee: {
      chamber: "House",
      id: "HSGO",
      name: "House Committee on Oversight and Government Reform"
    }}
  ],
  options: { target: <bioguide_id> }
  
  "showFacebookInfo" - display a legislator's facebook photo
  data: {
    avatar_url: <avatar url>,
    wall_url: <wall url>,
    facebook_id: <facebook id>
  },
  options: { target: <bioguide_id> }
  
  "showTwitterInfo" - display a legislator's recent tweets
  data: [
    {text: <tweet text> }
  ],
  options: { target: <bioguide_id> }
  
  "showRetrievingData" - let the user know the data is repopulating
  data: null,
  options: null
  
EVENTS DISPATCHED
-----------------

  "REQUEST_DETAILS"

*/
UIRPC.list = function(){
  
  // Create the markup for the list of people
  var showLegislators = function(data, options){
    var markup = $("<div class='legislators'/>");
    markup.append("<div class='numResults'>Results: " + data.length + "</div");
    
    for(var i=0;i<data.length;i++){
      var legislator = data[i].legislator;
      var container = $("<div class='legislator "+legislator.party+"' id='"+legislator.bioguide_id+"'/>")
        .data(legislator); // put the legislator info into the node's data object
      var photo = $("<img src='http://www.opencongress.org/images/photos/thumbs_125/"+legislator.govtrack_id+".jpeg' />")
        .hover(function(){
          $(this).toggleClass('hover');
        })
        .click(function(){
          var bioguide_id = $(this).closest(".legislator").data("bioguide_id");
          pmrpc.call({
            destination : window,
            publicProcedureName : "event",
            params : {
              data: {
                eventName: "REQUEST_DETAILS",
                data: $(this).closest(".legislator").data(),
                options: { target: bioguide_id }
              }
            }
          });
        });
      var fullName = "<span class='name'>"+legislator.title+". "+legislator.firstname+" "+legislator.lastname+"</span>";
      var state = "<span class='state'>("+legislator.state+")</span>";
      var details = "<div class='details'></div>";
      container.append(photo).append(fullName).append(state).append(details);
      markup.append(container)
    }
    $(".list").html(markup);
  };
  
  // create the markup for the list of committees and append it to the correct legislator's "details" section
  var showCommittees = function(data, options){
    $(".committees").remove();
    var committees = $("<div class='committees'><h4>Committees</h4></div>");
    var committeesList = $("<ul/>")
    for(var i=0;i<data.length;i++){
      var c = data[i].committee;
      var committee = $("<li>"+c.name+"</li>");
      committeesList.append(committee);
    }
    committees.append(committeesList);
    $("#"+options.target).find(".details").append(committees);
  };
  
  // create the markup for the facebook data and append it to the correct legislator's "details" section
   var showFacebookInfo = function(data, options){
     $(".facebook").remove();
     if(data.facebook_id !== ""){
       var facebook = $("<div class='facebook'><h4>Facebook: <a href='"+data.wall_url+"' target='_blank'>" +data.facebook_id+"</a></h4></div>");
       var avatar = $("<img/>");
       avatar.attr("src", data.avatar_url);
       facebook.append(avatar);
       $("#"+options.target).find(".details").append(facebook);
     }
   };

   // create the markup for the twitter data and append it to the correct legislator's "details" section
    var showTwitterInfo = function(data, options){
      $(".twitter").remove();
      if(data.length > 0){
        var twitter = $("<div class='twitter'><h4>Tweets:</h4></div>");
        var tweetsList = $("<ul/>");
        for(var i=0;i<data.length;i++){
          tweetsList.append("<li>"+data[i].text)+"</li>";
        }
        twitter.append(tweetsList);
        $("#"+options.target).find(".details").append(twitter);
      }
    };

   // display a "Retrieving Data..." placeholder
  var showCalculating = function(data, options){
    $(".numResults").text("Retrieving Data...");
  };
  
  return {
    
    init: function(location, options) {

      pmrpc.register({
        publicProcedureName: "showLegislators",
        procedure: function (data, options) {
          showLegislators(data, options);
        },
        isAsynchronous: true
      });
      
      pmrpc.register({
        publicProcedureName: "showCommittees",
        procedure: function (data, options) {
          showCommittees(data, options);
        },
        isAsynchronous: true
      });
      
      pmrpc.register({
        publicProcedureName: "showFacebookInfo",
        procedure: function (data, options) {
          showFacebookInfo(data, options);
        },
        isAsynchronous: true
      });
      
      pmrpc.register({
        publicProcedureName: "showTwitterInfo",
        procedure: function (data, options) {
          showTwitterInfo(data, options);
        },
        isAsynchronous: true
      });
      
      pmrpc.register({
        publicProcedureName: "showRetrievingData",
        procedure: function (data, options) {
          showCalculating(data, options);
        },
        isAsynchronous: true
      });

    } 
    
  }; 
  
}();