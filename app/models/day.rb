class Day < ActiveRecord::Base
	belongs_to :task
<<<<<<< HEAD
	default_scope { order('date ASC') } 
=======
	default_scope order('date ASC')
>>>>>>> a7a81149aff0eaa4409c7672f938184552e46b1d
end
