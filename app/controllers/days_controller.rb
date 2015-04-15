class DaysController < ApplicationController

	def edit
		@day = current_user.tasks.find(params[:task_id]).days.find(params[:id])
		@task = current_user.tasks.find(params[:task_id])
		@tasks = current_user.tasks.all
		render partial: "clock"
	end

	def update
		@day = current_user.tasks.find(params[:task_id]).days.find(params[:id])
		if @day.update_attributes(day_params)
			render partial: "day", locals: { day: @day, task: @day.task }
		else
			redirect_to login_path
		end
	end

	private

	def day_params
		params.require(:day).permit(:work_time)
	end


end
