class UsersController < ApplicationController

	def new
  	@user = User.new
  end

	def show
    @tasks = current_user.tasks.all
	end

  def create
  	@user = User.new(user_params)
  	if @user.save
  		session[:user_id] = @user.id
  		current_user
  		redirect_to user_path(current_user)
  	else
  		render 'new'
  	end
  end

  def edit
  end

  def update
    if current_user.authenticate(params[:old_password]) && current_user.update_attributes(user_params)
        redirect_to user_path(current_user)
    else
      render 'edit'
    end
  end

  def destroy
    current_user.destroy
    logout
    redirect_to login_path
  end

  private

  def user_params
  	params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end

end
