module DaysHelper

	def div_day(day, task)
	  if !day.work_time.nil? && last_thirty_days?(day)
	  	content_tag :div, class: "#{day_class(day, task)} editable_day", onclick: "location.href =  '#{edit_task_day_path(task.id, day.id)}'", style: "background-color:#{day_color(day, task)}" do
	    end
		elsif last_thirty_days?(day)
			content_tag :div, class: "#{day_class(day, task)} editable_day", onclick: "location.href =  '#{edit_task_day_path(task.id, day.id)}'" do
	    end
	  elsif !day.work_time.nil?
	  	content_tag :div, class: "#{day_class(day, task)}", style: "background-color:#{day_color(day, task)}" do
	  	end
	  else
	  	content_tag :div, class: "#{day_class(day, task)}" do
	    end
	  end
	end

	def last_thirty_days?(day)
		(Time.now.to_date - day.date).to_i < 31 && (Time.now.to_date - day.date).to_i > -1
	end

	def day_class(day, task)
		(day.date == Time.now.to_date) ? "day target" : "day"
	end

	def activity_colors(index)
		colors = ["#FFFFFF", "#CCFFCC", "#99FF99", "#66FF66", "#33FF33", "#00FF00", "#00F500", "#00EB00",
							"#00E000", "#00D600", "#00CC00", "#00C200", "#00B800", "#00AD00", "#00A300", "#009900",
							"#008F00", "#008500", "#007A00", "#007000", "#006600", "#005C00", "#005200", "#004700"]
		colors[index]
	end

	def day_color(day, task)
		mwt = (task.max_work_time.strftime('%H').to_i*60)*60 + (task.max_work_time.strftime('%M').to_i*60) + task.max_work_time.strftime('%S').to_i
		wt = (day.work_time.strftime('%H').to_i*60)*60 + (day.work_time.strftime('%M').to_i*60) + day.work_time.strftime('%S').to_i
		index = (wt > mwt) ? 23 : (wt.to_f / mwt.to_f * 23).to_i
		activity_colors(index)
	end

end
