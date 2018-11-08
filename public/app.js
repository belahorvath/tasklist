/**
$(document).ready(function() {
  $.get("/projects", function(res) {
      console.log("ddd");
    $.each(res.projects, function(index, project) {
      $("#projects").append($("<li>").text(project));
    });
  });

  $("button").click(function(event) {
    $.post("/projects", $("form").serialize(), function(res) {
      $("form input").val('');
      $("#projects").append($("<li>").text(res.project));
    });
    event.preventDefault();
  });
});
**/
