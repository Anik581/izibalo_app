module TasksHelper

	def tasks_timeline(tasks)
		array = []
		@tasks.each do |task|
			array.push(["#{task.name}","#{task.days.first.date}", "#{task.days.last.date}"])
		end
		array
	end

end
