# Place all the behaviors and hooks related to the matching controller here.
# All this logic will automatically be available in application.js.
# You can use CoffeeScript in this file: http://coffeescript.org/

$("#new_task").change ->
  $form = $(this)
  $input_value = $form.children("#task_max_work_time").val()
  $label = $form.children("#task_max_work_time").siblings("label")
  $label.text "Current Value = " + $input_value
  return
