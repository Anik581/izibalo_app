class Task < ActiveRecord::Base
	belongs_to :user
	has_many :days, dependent: :destroy


	def selected_month(params)
    date = Date.strptime(params, '%m-%Y')
    self.days.where('date BETWEEN ? AND ?', date, date.end_of_month)
  end

  def current_month
  	self.days.where('date BETWEEN ? AND ?', Time.now.beginning_of_month, Time.now.end_of_month)
  end

  def active_days(part_of_task)
  	unless part_of_task.select { |day| day if day.date == Time.now.to_date }.empty?
  		self.days.where('date BETWEEN ? AND ?', part_of_task.first.date, Time.now)
  	else
  		self.days.where('date BETWEEN ? AND ?', part_of_task.first.date, part_of_task.last.date)
  	end
  end

end
