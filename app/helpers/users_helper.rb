module UsersHelper

	def all_days(tasks, option={})
		all_days = []
		if option[:active]
			tasks.each { |task| all_days += task.active_days(task.days.all) }
		else
			tasks.each { |task| all_days += task.days.all }
		end
		all_days
	end

	def open_closed_tasks(tasks, option={})
		if option[:closed]
			tasks.select { |task| task.days.last.date < Time.now.to_date }.count
		elsif option[:open]
			tasks.select { |task| task.days.last.date >= Time.now.to_date }.count
		end
	end

	def time_to_seconds(days)
		seconds = 0
		days.each do |day|
			unless day.work_time.nil?
			seconds += (day.work_time.strftime('%H').to_i*60)*60 + (day.work_time.strftime('%M').to_i*60) + day.work_time.strftime('%S').to_i
			end
		end
		seconds
	end

	def time_in_H_M_S(seconds)
		hours = seconds / 3600
		"#{hours} : #{Time.at(seconds).utc.strftime('%M : %S')}"
	end

	def all_work_time(days)
		time = time_in_H_M_S(time_to_seconds(days))
		"#{time} ( #{pluralize(time.gsub(' ',"").split(':').first.to_i/24 ,"day")} )"
	end

	def average_time(days)
		"#{time_in_H_M_S(time_to_seconds(days) / (days.count == 0 ? 1 : days.count))}"
	end

end
