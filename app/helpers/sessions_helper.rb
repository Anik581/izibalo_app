module SessionsHelper

	def logged?
		current_user
	end

	def current_user
		current_user ||= User.find(session[:user_id]) if session[:user_id]
	end

	def logout
		session[:user_id] = nil
	end

	# def login(user_id)
	# 	@current_user ||= User.find(session[:user_id]) if session[:user_id]
	# end

	#def login(user)
	#	self.current_user = user
	#end

	#def current_user=(user)
	#	@current_user = user
	#end

end