$(function() {

  InitTasks = function() {

    $(document).ready(function() {
      DisplayMaxWorkTime();
      if ( $("#hidden_calendar").length > 0 ) {
        CalendarAutoScroll();
      };
      if ( $("#area_chart_overall").length > 0 ) {
        InitAreaChartOverall();
        $(window).resize(function(){ InitAreaChartOverall() });
      };
      if ( $("#pie_chart_task_progress").length > 0 ) {
        InitPieChartProgress();
        $(window).resize(function(){ InitPieChartProgress() });
      };
      if ( $("#pie_chart_time_details").length > 0 ) {
        InitPieChartTimeDetails();
        $(window).resize(function(){ InitPieChartTimeDetails() });
      };
    });

  };

  DisplayMaxWorkTime = function() {
   $("#task_max_work_time").on("change", function () {
      var hour = $('#task_max_work_time').val();
      $("#display").html("Max hours for day - " + hour);
    }); 
  };

  CalendarAutoScroll = function() {
    var hidden_calendar = $("#hidden_calendar");
    var visible_calendar = $("#visible_calendar");
    var target = hidden_calendar.find(".target");
    if ( target.length == 0 ) { target = $(hidden_calendar).find(".day").last() };
    var visible_calendar_width = visible_calendar.width();
    var hidden_calendar_width = hidden_calendar.width();
    var target_margin = (parseInt($(".day").css("margin-top")));
    var space_on_the_right_of_target = parseInt($(".day").css("width"));
    var space_without_calendar = ($(".container").offset().left) + parseInt($(".container").css("padding-left"));
    var move = ($(target).offset().left + (2 * space_on_the_right_of_target)+(2 * target_margin) - space_without_calendar) - parseInt($("#visible_calendar").css("margin-left"));
    var validate_move = 0
    if (move - visible_calendar_width > 0) {
      if ((move - visible_calendar_width) < (hidden_calendar_width - visible_calendar_width)) {
        validate_move = move - visible_calendar_width;
      } else {
        validate_move = ((move - space_on_the_right_of_target) - (2 * target_margin)) - visible_calendar_width;
      }
    }
    $(visible_calendar).niceScroll(hidden_calendar,{
      cursorborder: false,
      background: "#999",
      cursorcolor:"white",
      cursorwidth:"14px",
      cursorborderradius: "5px",
      autohidemode: false
    }).doScrollLeft(  validate_move  );
  };

  InitAreaChartOverall = function() {
    google.load('visualization', '1', {packages:["corechart"], callback: AreaChartOverall});
  };

  AreaChartOverall = function() {
    var area_chart_overall = $("#area_chart_overall");
    var array = area_chart_overall.data("active-days");
    var title = area_chart_overall.data("area-chart-title");
    var hours_vaxis = area_chart_overall.data("hours-vaxis");
    var data = google.visualization.arrayToDataTable(array);
    var options = {
      title: title,
      titleTextStyle: {color: '#B2B2B2'},
      hAxis: {textStyle: {color: '#B2B2B2'}},
      vAxis: {textStyle: {color: '#B2B2B2'},
              minValue: 0,
              ticks: hours_vaxis },
      backgroundColor: '#2e3137',
      legend: {position: 'none'},
      chartArea: {backgroundColor: '#43464B'},
      colors:['#00CC00']
    };
    var chart = new google.visualization.AreaChart( area_chart_overall[0] );
    chart.draw(data, options);
  };

  InitPieChartProgress = function() {
    google.load('visualization', '1', {packages:["corechart"], callback: PieChartProgress});
  };

  PieChartProgress = function() {
    var array = $("#pie_chart_task_progress").data("task-progress");
    var title = $("#pie_chart_task_progress").data("task-title");
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
    var chart = new google.visualization.PieChart( $("#pie_chart_task_progress")[0] );
    chart.draw(data, options);
  };

  InitPieChartTimeDetails = function() {
    google.load('visualization', '1', {packages:["corechart"], callback: PieChartTimeDetails});
  };

  PieChartTimeDetails = function() {
    var array = $("#pie_chart_time_details").data("time-details");
    var slices_colors = $("#pie_chart_time_details").data("slices-colors");
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
    var chart = new google.visualization.PieChart( $("#pie_chart_time_details")[0] );
    chart.draw(data, options);
  };

  InitTasks();

});
