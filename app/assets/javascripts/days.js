$(document).ready(function() {
  var elapsed_settime, make_params, max_work_time, ms, one_hour, one_minute, one_second, seconds_settime;
  seconds_settime = 0;
  elapsed_settime = 0;
  one_second = 1000;
  one_minute = 60000;
  one_hour = 3600000;
  max_work_time = max_work_time_to_milliseconds();
  function max_work_time_to_milliseconds() {
    var task_max_work_time = $('#task_max_work_time').text();
    return (parseInt(task_max_work_time.split('-')[0]) * one_hour)+(parseInt(task_max_work_time.split('-')[1]) * one_minute)
  }
  function sformat(s) {
    var fm;
    s = s / 1000;
    fm = [
      Math.floor(s / 60 / 60) % 24,
      Math.floor(s / 60) % 60, s % 60
      ];
    return $.map(fm, function(v, i) {
      return (v < 10 ? "0" : "") + v;
    }).join(":");
  };
  function make_params(ms) {
    $("input[name='day[work_time]']").val("2000-01-01 " + sformat(ms));
  };
  function display_and_params_HMS(ss) {
    timer.stopwatch("reset");
    if (seconds_settime > max_work_time) {
      seconds_settime = max_work_time;
    } else {
      seconds_settime;
    }
    if (seconds_settime < 0) {
      seconds_settime = 0;
    } else {
      seconds_settime;
    }
    $("#clock").html(sformat(seconds_settime));
    make_params(seconds_settime);
  };
  function set_seconds_settime_and_elapsed_settime_for_plus(ms) {
    if ((elapsed_settime + ms) >= max_work_time) {
      elapsed_settime = max_work_time;
      seconds_settime = max_work_time;
      $("#start_stop").addClass("disabled");
    } else {
      seconds_settime = elapsed_settime += ms;
    }
  };
  function set_seconds_settime_and_elapsed_settime_for_minus(ms) {
    if (elapsed_settime < ms) {
      elapsed_settime = 0;
      seconds_settime = 0;
    } else {
      seconds_settime = elapsed_settime -= ms;
    }
    if ($("#start_stop").is(".disabled")) { $("#start_stop").removeClass("disabled") }
  };
  function start_stop_button() {
    $("#start_stop").toggleClass(function() {
      if ($(this).is(".btn-primary")) {
        $("#submit").addClass("disabled");
        $(this).removeClass("btn-primary");
        $(this).text("Pause");
        return "btn-warning";
      } else {
        $("#submit").removeClass("disabled");
        $(this).removeClass("btn-warning");
        $(this).text("Start");
        return "btn-primary";
      }
    });
    if ($("#set").is(".btn-warning")) {
      set_button();
    }
  };
  set_button = function() {
    $("#set").toggleClass(function() {
      if ($(this).is(".btn-primary")) {
        $(this).removeClass("btn-primary");
        return "btn-warning";
      } else {
        $(this).removeClass("btn-warning");
        return "btn-primary";
      }
    });
    $(".plus").toggle();
    $(".minus").toggle();
  };
  $("#set").click(function() {
    if ($("#start_stop").is(".btn-warning")) {
      timer.stopwatch("toggle");
      start_stop_button();
      set_button();
    } else {
      set_button();
    }
  });
  make_params(0);
  timer = $("#timer").stopwatch().bind("tick.stopwatch", function(e, elapsed) {
    elapsed += seconds_settime;
    elapsed_settime = elapsed;
    make_params(elapsed_settime);
    $("#clock").text(sformat(elapsed_settime));
    if (elapsed >= max_work_time) {
      $(this).stopwatch("toggle");
      start_stop_button();
      $("#start_stop").addClass("disabled");
    }
  });
  $("#hours_more").click(function() {
    set_seconds_settime_and_elapsed_settime_for_plus(one_hour);
    display_and_params_HMS(seconds_settime);
  });
  $("#minutes_more").click(function() {
    set_seconds_settime_and_elapsed_settime_for_plus(one_minute);
    display_and_params_HMS(seconds_settime);
  });
  $("#seconds_more").click(function() {
    set_seconds_settime_and_elapsed_settime_for_plus(one_second);
    display_and_params_HMS(seconds_settime);
  });
  $("#hours_less").click(function() {
    set_seconds_settime_and_elapsed_settime_for_minus(one_hour);
    display_and_params_HMS(seconds_settime);
  });
  $("#minutes_less").click(function() {
    set_seconds_settime_and_elapsed_settime_for_minus(one_minute);
    display_and_params_HMS(seconds_settime);
  });
  $("#seconds_less").click(function() {
    set_seconds_settime_and_elapsed_settime_for_minus(one_second);
    display_and_params_HMS(seconds_settime);
  });
  $("#start_stop").click(function() {
    timer.stopwatch("toggle");
    start_stop_button();
  });
  $("#reset").click(function() {
    timer.stopwatch("reset");
    make_params(0);
    seconds_settime = 0;
    elapsed_settime = 0;
    $("#clock").html("00:00:00");
    if ($("#start_stop").is(".disabled")) {
      $("#start_stop").removeClass("disabled");
    }
  });
});
