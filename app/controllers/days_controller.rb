class DaysController < ApplicationController

	def edit
		@day = current_user.tasks.find(params[:task_id]).days.find(params[:id])
		@task = current_user.tasks.find(params[:task_id])
		@tasks = current_user.tasks.all

		render partial: "clock"
	end

	def update
		@day = current_user.tasks.find(params[:task_id]).days.find(params[:id])
		# if 
		# 	redirect_to login_path
		# else
	# if @day.update_attributes(day_params)
	# 	redirect_to task_path(@day.task.id)
	# else
	# 	redirect_to login_path
	# end
		# end


		@day.update_attributes(day_params)
		render partial: "day", locals: { daaay: @day, task: @day.task }
	end

	private

	def day_params
		params.require(:day).permit(:work_time)
	end


end
