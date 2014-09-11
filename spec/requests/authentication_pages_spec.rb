require 'rails_helper'
require 'spec_helper'


describe "Authentication" do
	subject { page }

	describe "login page" do
		before { visit login_path }

		it { should have_title('Login') }
		it { should have_field('Email') }
		describe "with valid information" do
			let(:user) { FactoryGirl.create(:user) }
			before { login user }

			it { should have_title(user.name.capitalize) }
		end
	end
end




# RSpec.describe "AuthenticationPages", :type => :request do
#   describe "GET /authentication_pages" do
#     it "works! (now write some real specs)" do
#       get authentication_pages_index_path
#       expect(response.status).to be(200)
#     end
#   end
# end
