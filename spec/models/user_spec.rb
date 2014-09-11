require 'rails_helper'
require 'spec_helper'

RSpec.describe User, :type => :model do

	before { @user = FactoryGirl.create(:user) }

	subject { @user }

	it { should respond_to(:name) }
	it { should respond_to(:email) }
	it { should respond_to(:password) }
	it { should respond_to(:password_confirmation) }
	it { should respond_to(:password_digest) }
	it { should be_valid }

end
