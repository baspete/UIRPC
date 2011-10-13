/*

This widget displays a list of legislators

PROCEDURES REGISTERED
---------------------

  "showLegislators" - Renders an array of legislators based on the api at http://services.sunlightlabs.com/docs/congressapi/legislators.get(List)/
  data:  [
    {"legislator": {
      bioguide_id: "F000444"
      birthdate: "1962-12-31"
      chamber: "house"
      congress_office: "240 Cannon House Office Building"
      congresspedia_url: "http://www.opencongress.org/wiki/Jeff_Flake"
      crp_id: "N00009573"
      district: "6"
      email: ""
      eventful_id: ""
      facebook_id: "congressmanjeffflake"
      fax: "202-226-4386"
      fec_id: "H0AZ01184"
      firstname: "Jeff"
      gender: "M"
      govtrack_id: "400134"
      in_office: <bool>
      lastname: "Flake"
      middlename: ""
      name_suffix: ""
      nickname: ""
      official_rss: ""
      party: "R"
      phone: "202-225-2635"
      senate_class: ""
      state: "AZ"
      title: "Rep"
      twitter_id: "JeffFlake"
      votesmart_id: "28128"
      webform: "http://www.house.gov/writerep"
      website: "http://flake.house.gov/"
      youtube_url: "http://www.youtube.com/flakeoffice"
    }}
  ]
  
  "showCommittees" - display a legislator's committee membership(s)
  data: [
    {committee: {
      chamber: "House",
      id: "HSGO",
      name: "House Committee on Oversight and Government Reform"
    }}
  ],
  options: { target: <bioguide_id> }
  
EVENTS DISPATCHED
-----------------

  "DETAILS_LINK_CLICKED"

*/
UIRPC.list = function(){
      
  var showLegislators = function(data, options){
    var markup = $("<div class='legislators'/>");
    for(var i=0;i<data.length;i++){
      var legislator = data[i].legislator;

      var container = $("<div class='legislator' id='"+legislator.bioguide_id+"'/>");
      var photo = $("<img src='http://www.opencongress.org/images/photos/thumbs_125/"+legislator.govtrack_id+".jpeg' />")
        .click(function(){
          var bioguide_id = $(this).closest(".legislator").attr("id");
          pmrpc.call({
            destination : window,
            publicProcedureName : "event",
            params : {
              data: {
                eventName: "DETAILS_LINK_CLICKED",
                data: { bioguide_id: bioguide_id },
                options: { target: bioguide_id }
              }
            }
          });
        })
        .hover(function(){
          $(this).toggleClass('hover');
        });
      var fullName = "<span class='name'>"+legislator.firstname+" "+legislator.lastname+"</span>";

      container.append(photo).append(fullName);
      markup.append(container)
    }
    $(".list").html(markup);
    
  };
  
  var showCommittees = function(data, options){
    $(".committees").remove();
    var committees = $("<ul class='committees' />")
    for(var i=0;i<data.length;i++){
      var c = data[i].committee;
      var committee = $("<li>"+c.name+"</li>");
      committees.append(committee);
    }
    $("#"+options.target).append(committees);
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
      
    } 
    
  }; 
  
}();