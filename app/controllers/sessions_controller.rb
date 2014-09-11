class SessionsController < ApplicationController

	def new
		redirect_to user_path(current_user) if logged?
	end

	def create
		user = User.find_by(email: params[:email])
		if user && user.authenticate(params[:password])
			session[:user_id] = user.id
			current_user
			redirect_to user_path(current_user) if logged?
		else
			redirect_to login_path
		end
	end

	def destroy
		logout
		redirect_to login_path
	end

end
