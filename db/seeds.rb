# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

puts "********Seeding Start************"


# ....................anik................................

def fikumiku
 fikumiku = [ 2,2,6,
	 						2,6,4,4,2,4,4,
	 						2,2,4,4,2,2,2,
	 						6,2,2,4,2,4,2,
	 						2,4,2,0,0,2,2,
	 						4,4,4,4,4,2,4,
	 						4,0,4,2,4,0,2,
	 						2,2,2,2,2,6,0,
	 						0,0,0,4,6,6,6,
	 						0,4,4,4,2,0,0,
	 						2,2,4,2,4,0,2,
	 						0,6,4,4,2,0,4,
	 						2,2,4,4,0,2,2,
	 						0,6,0,2,6,6,6,
	 						2,8,8,0,0,6,2,
	 						0,0,0,6,2,2,8,
	 						0,8,8,2,8,8,2
	 						6,8,8,8,8,8,2]
end

def anik_user
		User.create!(name: "anik",
								 email: "aaanik@o2.pl",
								 pasword: "example581",
								 password_confirmation: "example581")
end

def anik_task_fikumiku
	User.find_by(name: "anik").tasks.create!(
             name: "rails",
             max_work_time: Time.utc(2000,01,01,8,0,0)
             )

		fikumiku
	  i = 0
	  time = nil
	(("2014-07-03").to_date..("2015-07-03").to_date).each do |day|
		h = fikumiku[i]
		time = h.nil? ? nil : Time.utc(2000,01,01,h,0,0)
		i += 1
		User.find_by(name: "anik").tasks.find_by(name: "fikumiku").days.create(date: day, work_time: time)
	end
end

def anik_task_full
	User.find_by(name: "anik").tasks.create!(
             name: "full",
             max_work_time: Time.utc(2000,01,01,10,0,0)
             )

	(("2014-02-15").to_date..("2015-02-15").to_date).each do |day|
		time = (day >= Time.now.to_date) ? nil : (Date.new(2000,01,01) + rand(1..10).hour + rand(0..60).minutes).to_datetime
		User.find_by(name: "anik").tasks.find_by(name: "full").days.create(date: day, work_time: time)
	end
end

def anik
	if User.find_by(name: "anik").nil?
		puts "create user anik"
		anik_user
		puts "create anik task fikumiku"
		anik_task_fikumiku
		puts "create anik task full"
		anik_task_full
	elsif User.find_by(name: "anik").tasks.find_by(name: "fikumiku").nil?
		puts "create anik task fikumiku"
		anik_task_fikumiku
	elsif User.find_by(name: "anik").tasks.find_by(name: "full").nil?
		puts "create anik task full"
		anik_task_full
	end
end

# ....................anik..end...........................


anik


puts "********Seeding End************"
