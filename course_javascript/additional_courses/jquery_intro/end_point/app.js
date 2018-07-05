window.onload = function(){
  var $conversation = $("#conversation");
  console.log($conversation);

  var $pTags = $("p");
  console.log($pTags);

  $conversation.css({
      "background-color": "tomato",
      "padding": "10px",
      "color": "wheat"
    });

  $conversation.width("400px");

  /////////////////////////////////

  $(".dave").css({
    "background-color": "grey",
    "padding": "5px"
  });

  $(".hal").css({
    "background-color": "coral",
    "padding": "5px"
  });

  /////////////////////////////////

  $("#conversation .dave").html("This is Dave");
  $("#conversation .hal").html("This is Hal");

  /////////////////////////////////
  
  $("#conversation .dave:first").html("<i>Hello, HAL. Do you read me, HAL?</i>");
  $("#conversation .hal:first").html("<i>Affirmative, Dave. I read you.</i>");

  $("#conversation .dave:last").html("<i>Open the pod bay doors, HAL.</i>");
  $("#conversation .hal").eq(1).html("<i>I'm sorry, Dave. I'm afraid I can't do that.</i>");

  /////////////////////////////////

  $('p').on("click", function() {
    $(this).fadeOut();
  });

  /////////////////////////////////
  $('#get-details').on("click", function() {
    
    $.ajax("http://www.omdbapi.com/?t=2001&y=&plot=short&r=json", {
       success: function(data) {
        $('#movie-data').html(
            "<h1>" + data.Title + "</h1>" + 
            "<h2>" + data.Released + "</h2>" +
            "<h3>" + data.Awards + "</h3>"
          );
       },
       error: function(error) {
          $('#notification-bar').text('An error occurred:');
       }
    });

  });




}
