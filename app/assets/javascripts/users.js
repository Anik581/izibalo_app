$(function() {

  InitUsers = function() {

    $(document).ready(function() {
      if ( $("#pie_chart_user_progress").length > 0 ) {
        InitPieChartUserProgress();
        $(window).resize(function(){ InitPieChartUserProgress() });
      };
    });

  };

  InitPieChartUserProgress = function() {
    google.load('visualization', '1', {packages:["corechart"], callback: PieChartUserProgress});
  };

  PieChartUserProgress = function () {
    var array = $("#pie_chart_user_progress").data("tasks-progress");
    var data = google.visualization.arrayToDataTable(array);
    var options = {
      title: 'Time of all tasks',
      titleTextStyle: {color: '#B2B2B2'},
      backgroundColor: '#2e3137',
      legend: {textStyle: {color: '#B2B2B2'}},
      pieSliceBorderColor: '#B2B2B2',
      slices: {0: {color: '#008A00'}, 1: {color: '#43464B'}},
      chartArea: {top: 70},
      height: 350,
    };
    var chart = new google.visualization.PieChart( $("#pie_chart_user_progress")[0] );
    chart.draw(data, options);
  };

  InitUsers();

});
