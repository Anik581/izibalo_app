
//.............................................................new

jQuery(function(){
  $("#task_max_work_time").change(function () {                    
		var newValue = $('#task_max_work_time').val();
		$("#display").html("Max hours for day - " + newValue);
	})
});

//.............................................................show

jQuery(function(){
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
	})
});

//.............................................................stats(overall,month,week)

function AreaChartOverall() {
  var array = JSON.parse($('#active_days_area_chart').text())
  var hours_vaxis = JSON.parse($('#hours_vaxis').text())
  var title = JSON.parse($('#area_chart_title').text())
  var data = google.visualization.arrayToDataTable(array);
  var options = {
    title: title,
    titleTextStyle: {color: '#B2B2B2'},
	  hAxis: {textStyle: {color: '#B2B2B2'}},
    vAxis: {textStyle: {color: '#B2B2B2'},
    				minValue: 0,
    				ticks: hours_vaxis},
    backgroundColor: '#2e3137',
    legend: {position: 'none'},
    chartArea: {backgroundColor: '#43464B'},
    colors:['#00CC00']
  };
  var chart = new google.visualization.AreaChart(document.getElementById('area_chart_overall'));
  chart.draw(data, options);
}

function PieChartProgress() {
	var array = JSON.parse($('#task_progress_pie_chart').text())
  var title = JSON.parse($('#pie_chart_task_title').text())
  var data = google.visualization.arrayToDataTable(array);
  var options = {
    title: title,
    titleTextStyle: {color: '#B2B2B2'},
    backgroundColor: '#2e3137',
    legend: {textStyle: {color: '#B2B2B2'}},
    pieSliceBorderColor: '#B2B2B2',
    slices: {0: {color: '#008A00'}, 1: {color: '#43464B'}},
    chartArea: {top: 70},
    height: 350,
  };
  var chart = new google.visualization.PieChart(document.getElementById('pie_chart_task_progress'));
  chart.draw(data, options);
}

function PieChartTimeDetails() {
	var array = JSON.parse($('#time_details_pie_chart').text())
	var slices_colors = JSON.parse($('#slices_colors').text())
  var data = google.visualization.arrayToDataTable(array);
  var options = {
    title: 'Activity time in details',
    titleTextStyle: {color: '#B2B2B2'},
    backgroundColor: '#2e3137',
    legend: {textStyle: {color: '#B2B2B2'}},
    pieSliceBorderColor: '#B2B2B2',
    slices: slices_colors,
    chartArea: {top: 70},
    height: 350,
  };
  var chart = new google.visualization.PieChart(document.getElementById('pie_chart_time_details'));
  chart.draw(data, options);
}

google.load('visualization', '1', {packages:["corechart"], callback: init_overall_stats});

function init_overall_stats() {
  AreaChartOverall();
  PieChartProgress();
  PieChartTimeDetails();
}

$(window).resize(function(){
  AreaChartOverall();
  PieChartProgress();
  PieChartTimeDetails();
});

$(document).ready(init_overall_stats);
$(document).on('page:load', init_overall_stats);
