class User < ActiveRecord::Base
	has_many :tasks, dependent: :destroy

	before_save { self.email = email.downcase }

	FORMAT_EMAIL = /\A[\w+\-.]+@[a-z\d\-.]+\.[a-z]+\z/i

	validates :name,	presence: true,
										length: { maximum: 20 }

	validates :email, presence: true,
										uniqueness: { case_sensitive: false },
										format: { with: FORMAT_EMAIL }


	has_secure_password
		 validates :password, length: { within: 6..16 }, allow_blank: :true
end
