class TasksController < ApplicationController

	def new
		@task = Task.new
		#@day = Day.new
	end

	def index
		@tasks = current_user.tasks.all
	end

	def show
		@task = current_user.tasks.find(params[:id])
		@tasks = current_user.tasks.all
	end

	def overall_stats
		@task = current_user.tasks.find(params[:id])
		@tasks = current_user.tasks.all

		end_range = (@task.days.last.date > Time.now.to_date) ? Time.now.to_date : @tasks.days.last.date
		count_active_days = (@task.days.first.date..@task.days.find_by(date: end_range).date).count 
		@active_days = @task.days.first(count_active_days)
		@active_days_area_chart_overall = area_chart_overall(@active_days)

		@task_progress = pie_chart_overall(@active_days, @task)

		@time_details = pie_chart_time_details(@active_days)
	end

	def month_stats

	end

	def week_stats

	end

	def create
	  if current_user.tasks.create(task_params)
	  	(current_user.tasks.last.created_at.to_date..current_user.tasks.last.timeout).each do |day|
	  		current_user.tasks.last.days.create(date: day)
	  	end
			redirect_to user_path(current_user)
		else
			render 'tasks'
		end
	end

	def destroy

	end

	private

	def task_params
		params.require(:task).permit(:name, :max_work_time, :timeout)
	end

end
