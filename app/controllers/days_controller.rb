class DaysController < ApplicationController

	def edit
		@day = current_user.tasks.find(params[:task_id]).days.find(params[:id])
		@task = current_user.tasks.find(params[:task_id])
		@tasks = current_user.tasks.all
	end

	def update
		@day = current_user.tasks.find(params[:task_id]).days.find(params[:id])
		@day.update_attributes(day_params)
		redirect_to task_path(@day.task.id)
	end

	private

	def day_params
		params.require(:day).permit(:work_time)
	end


end
