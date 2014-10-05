jQuery(function(){

  $("#task_max_work_time").change(function () {                    
		var newValue = $('#task_max_work_time').val();
		$("#display").html("Max hours for day - " + newValue);
	})

	$(document).ready(function() {
		var visible_calendar_width = $("#visible_calendar").width();
		var hidden_calendar_width = $("#hidden_calendar").width();
		var target_margin = (parseInt($(".day").css("margin-top")))
		var space_on_the_right_of_trget = parseInt($(".day").css("width"));
  	var space_without_calendar = ($(".container").offset().left) + parseInt($(".container").css("padding-left"));
  	var move = ($( ".target" ).offset().left + (2 * space_on_the_right_of_trget)+(2 * target_margin) - space_without_calendar) - parseInt($("#visible_calendar").css("margin-left"));
 		var validate_move = 0
		if (move - visible_calendar_width > 0) {
		  if ((move - visible_calendar_width) < (hidden_calendar_width - visible_calendar_width)) {
		    validate_move = move - visible_calendar_width;
		  } else {
		    validate_move = ((move - space_on_the_right_of_trget) - (2 * target_margin)) - visible_calendar_width;
		  }
		}
		$('#visible_calendar').niceScroll('#hidden_calendar',{
			cursorborder: false,
			background: "#999",
	    cursorcolor:"white",
	    cursorwidth:"14px",
	    cursorborderradius: "5px",
			autohidemode: false
		}).doScrollLeft(	validate_move	 );
	});

});

