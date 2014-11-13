function PieChartUserProgress() {
	var array = JSON.parse($('#user_progress_pie_chart').text())
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
  var chart = new google.visualization.PieChart(document.getElementById('pie_chart_user_progress'));
  chart.draw(data, options);
}

google.load('visualization', '1', {packages:["corechart"], callback: init_user_stats});

function init_user_stats() {
  PieChartUserProgress();
}

$(window).resize(function(){
  PieChartUserProgress();
});

$(document).ready(init_user_stats);
$(document).on('page:change', init_user_stats);
