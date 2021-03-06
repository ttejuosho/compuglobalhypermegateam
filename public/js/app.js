$(document).ready(function(){

    $(".button-collapse").sideNav();

    var url = window.location.search;
    
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
    var register = $("#register");
    var location = $("#location");
    var Role = $("#Role");
    var Bio = $("#Bio");

    $(register).on("submit", function createNewUser(event){
        event.preventDefault();

 // Constructing a newUser object to saves it to the database       
        var UserInfo = {
            location: location.val().trim(),
            Role: Role.val().trim(),
            Bio: Bio.val().trim()
        };

        
        submitUser(UserInfo);
    });

    // Submits a new User and brings user to member page upon completion
    function submitUser(UserInfo) {
        $.post("/api/userinfo/", UserInfo, function() {
          console.log(UserInfo);
        window.location.href = "/member";
        });
    }

  // Gets post data for a post if we're editing
  function getUserData(id) {
    $.get("/api/userinfo/" + id, function(data) {
      if (data) {
        // If this post exists, prefill our cms forms with its data

        location.val(data.location);
        Role.val(data.Role);
        Bio.val(data.Bio);

        // If we have a post with this id, set a flag for us to know to update the post
        // when we hit submit
        updating = true;
      }
    });
  }


    // Update a given post, bring user to the blog page when done
    function updateUserData(UserInfo) {
        $.ajax({
          method: "PUT",
          url: "/api/userinfo",
          data: post
        })
        .done(function() {
          window.location.href = "/member";
        });
      }

});