$(function() {

  InitDays = function() {

    $(document).ready(function() {
      if ( $("#clock_panel").length > 0 ) {
        TimeCounter();
      };
    });

  };

  TimeCounter = function() {
    var elapsed_settime, make_params, max_work_time, ms, one_hour, one_minute, one_second, seconds_settime;
    var seconds_settime = 0;
    var elapsed_settime = 0;
    var one_second = 1000;
    var one_minute = 60000;
    var one_hour = 3600000;
    
    max_work_time_to_milliseconds = function() {
      var task_max_work_time = $("#clock").data("max-work-time");
      return (parseInt(task_max_work_time.split('-')[0]) * one_hour)+(parseInt(task_max_work_time.split('-')[1]) * one_minute)
    }
    var max_work_time = max_work_time_to_milliseconds();
    sformat = function(s) {
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
    make_params = function(ms) {
      $("input[name='day[work_time]']").val("2000-01-01 " + sformat(ms));
    };
    display_and_params_HMS = function(ss) {
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
    set_seconds_settime_and_elapsed_settime_for_plus = function(ms) {
      if ((elapsed_settime + ms) >= max_work_time) {
        elapsed_settime = max_work_time;
        seconds_settime = max_work_time;
        $("#start_stop").addClass("disabled");
      } else {
        seconds_settime = elapsed_settime += ms;
      }
    };
    set_seconds_settime_and_elapsed_settime_for_minus = function(ms) {
      if (elapsed_settime < ms) {
        elapsed_settime = 0;
        seconds_settime = 0;
      } else {
        seconds_settime = elapsed_settime -= ms;
      }
      if ($("#start_stop").is(".disabled")) { $("#start_stop").removeClass("disabled") }
    };
    start_stop_button = function() {
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
      $("#hours_more, #minutes_more, #seconds_more").toggle();
      $("#hours_less, #minutes_less, #seconds_less").toggle();
    };
    $("#set").on("click", function() {
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
    $("#hours_more").on("click", function() {
      set_seconds_settime_and_elapsed_settime_for_plus(one_hour);
      display_and_params_HMS(seconds_settime);
    });
    $("#minutes_more").on("click", function() {
      set_seconds_settime_and_elapsed_settime_for_plus(one_minute);
      display_and_params_HMS(seconds_settime);
    });
    $("#seconds_more").on("click", function() {
      set_seconds_settime_and_elapsed_settime_for_plus(one_second);
      display_and_params_HMS(seconds_settime);
    });
    $("#hours_less").on("click", function() {
      set_seconds_settime_and_elapsed_settime_for_minus(one_hour);
      display_and_params_HMS(seconds_settime);
    });
    $("#minutes_less").on("click", function() {
      set_seconds_settime_and_elapsed_settime_for_minus(one_minute);
      display_and_params_HMS(seconds_settime);
    });
    $("#seconds_less").on("click", function() {
      set_seconds_settime_and_elapsed_settime_for_minus(one_second);
      display_and_params_HMS(seconds_settime);
    });
    $("#start_stop").on("click", function() {
      timer.stopwatch("toggle");
      start_stop_button();
    });
    $("#reset").on("click", function() {
      timer.stopwatch("reset");
      make_params(0);
      seconds_settime = 0;
      elapsed_settime = 0;
      $("#clock").html("00:00:00");
      if ($("#start_stop").is(".disabled")) {
        $("#start_stop").removeClass("disabled");
      };
    });
  };

  InitDays();

});


