class TasksController < ApplicationController

	def new
		@task = Task.new
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
		@active_days = @task.active_days(@task.days.all)
		render partial: "charts", locals: { part_days: @active_days, part_active_days: @active_days, remaining_time: @task.days.all }
	end

	def month_stats
		@task = current_user.tasks.find(params[:id])
		@tasks = current_user.tasks.all
  	@month = params[:month_date].nil? ? @task.current_month : @task.selected_month(params[:month_date])
  	@active_days_of_month = @task.active_days(@month)
    render partial: "charts", locals: { part_days: @month, part_active_days: @active_days_of_month, remaining_time: @month }
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
		current_user.tasks.find(params[:id]).destroy
		redirect_to tasks_path
	end

	private

	def task_params
		params.require(:task).permit(:name, :max_work_time, :timeout)
	end

end
