module TasksHelper
	include ActionView::Helpers::TextHelper

	def calendar_month_name(task)
		margin_month_name = 0
		current_week = 0
		task.days.map do |day|
			if day.date.saturday? && (day.date.saturday? != (day.date.strftime("%d") == "10")) && (day.date.saturday? != (day.date.strftime("%d") == "16")) && (current_week != day.date.cweek)
				margin_month_name += 32
			end
			if day.date.strftime("%d") == "10" && 8 < (task.days.last.date - day.date)
				current_week = day.date.cweek
				concat(content_tag :div, day.date.strftime("%b"), class: "month_name", style: "margin-left:#{margin_month_name}px")
				margin_month_name = 0
			end
		end
	end

	def tasks_timeline(tasks)
		array = []
		@tasks.each do |task|
			array.push(["#{task.name}","#{task.days.first.date}", "#{task.days.last.date}"])
		end
		array
	end

	def hours_vaxis(task)
		array = [{v: 0, f: '0:00'}, {v: 60, f: '1:00'}, {v: 120, f: '2:00'},
						 {v: 180, f: '3:00'}, {v: 240, f: '4:00'}, {v: 300, f: '5:00'},
						 {v: 360, f: '6:00'}, {v: 420, f: '7:00'}, {v: 480, f: '8:00'},
						 {v: 540, f: '9:00'}, {v: 600, f: '10:00'}, {v: 660, f: '11:00'},
						 {v: 720, f: '12:00'}, {v: 780, f: '13:00'}, {v: 840, f: '14:00'},
						 {v: 900, f: '15:00'}, {v: 960, f: '16:00'}, {v: 1020, f: '17:00'},
						 {v: 1080, f: '18:00'}, {v: 1140, f: '19:00'}, {v: 1200, f: '20:00'}]
		selected_elements = array.first(task.max_work_time.strftime('%k').to_i + 1)
		if task.max_work_time.strftime('%k').to_i < 7
			selected_elements
		else
			selected_elements.select { |h| selected_elements.index(h) % 2 == 0 }
		end
	end

	def time_work_in_minutes(day)
		day.work_time.nil? ? 0 : (day.work_time.strftime('%H').to_i*60) + day.work_time.strftime('%M').to_i
	end

	def area_chart(active_days)
		array = [['', 'Minutes']]
		active_days.each do |day|
			array.push(["#{day.date.strftime('%m-%d')}",time_work_in_minutes(day)])
		end
		array
	end

	def pie_chart_task_progress(active_days, task)
		array = [['Time name', 'Time']]
		activity_time = (task.first.date > Time.now.to_date) ? 0 : active_days.count
		array.push(['Activity time',(activity_time)],['Remaining time',(task.count - activity_time)])
	end

	def slices_colors(markers_array, max_work_time)
		slices_colors = {}
		def select_index(wt, mwt)
			mwt = mwt.strftime('%H').to_i*60*60
			wt =	wt*60*60
			index = (wt > mwt) ? 23 : (wt.to_f / mwt.to_f * 23).to_i
		end
		markers_array.each { |marker| slices_colors[markers_array.index(marker)] = {color: activity_colors(select_index(marker, max_work_time))} }
		slices_colors[0].replace({color: "#111111"}) if markers_array.include?(0)
		slices_colors
	end

	def markers_array(active_days)
		markers_array = []
		active_days.each do |day|
  		hours_time_work = day.work_time.nil? || (time_work_in_minutes(day) == 0) ? 0 : day.work_time.strftime('%H').to_i + 1
  		markers_array.push(hours_time_work) unless markers_array.include?(hours_time_work)
  	end
  	markers_array.sort!
	end

	def pie_chart_time_details(active_days)
  	array = [['Time name', 'Time']]
  	names = ['Empty days', 'Minutes', ' hour']
  	markers_array = markers_array(active_days)
  	markers_array.each do |marker|
  		marker < 2 ? array.push([names[marker], 0]) : array.push([pluralize(marker - 1, names[2]), 0])
  	end
		  markers_array.each do |marker|
		  	s = 0
	   		active_days.each do |day|
	   			case marker
	   			when 0
	   				s += 1 if day.work_time.nil? || day.work_time.strftime('%H%M').to_i == 0
	   			when 1
		      	s += 1 if !day.work_time.nil? && day.work_time.strftime('%H').to_i == 0 && day.work_time.strftime('%M').to_i != 0
		      else
		      	s += 1 if !day.work_time.nil? && day.work_time.strftime('%H').to_i == marker - 1
		      end
	    	end
	    	array[markers_array.index(marker) + 1][1] = s
	    end
  	array
	end

end
