class TasksController < ApplicationController

	def new
		@task = Task.new
		#@day = Day.new
	end

	def create
	  if current_user.tasks.create(task_params)
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
