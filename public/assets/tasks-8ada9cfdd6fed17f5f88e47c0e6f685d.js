jQuery(function(){

  $("#task_max_work_time").change(function () {                    
   var newValue = $('#task_max_work_time').val();
   $("#display").html("Max hours for day - " + newValue);
})


});


