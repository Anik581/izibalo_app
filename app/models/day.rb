class Day < ActiveRecord::Base
	belongs_to :task
	default_scope { order('date ASC') } 
end
