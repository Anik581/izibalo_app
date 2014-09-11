require 'rails_helper'
require 'spec_helper'

describe "User Pages" do
	subject { page }

	describe "create user" do
		before { visit new_user_path }
		let(:create) { "Create" }
		it "page" do
			expect(page).to have_title('Create user profile')
		end
		describe "with invalid information" do
			it "should not create a user" do
				expect { click_button create }.to_not change(User, :count)
			end
			describe "after failed creating user" do
				before { click_button create }
				it { should have_title('Create user profile')}
			end
		end
		describe "with valid information" do
			before do
				fill_in "Name",										with: "anik"
				fill_in "Email",									with: "581anik@gmail.com"
				fill_in "Password",								with: "tralalala"
				fill_in "Password confirmation", 	with: "tralalala"
			end
			it "should create a user" do
				expect { click_button create }.to change(User, :count).by(1)
			end
			describe "after saving the user" do
				before { click_button create }
				let(:user) { User.find_by(name: "anik") }
				it {should have_title(user.name.capitalize) }
			end
		end
	end

	describe "edit user" do
		let(:user) { FactoryGirl.create(:user) }
		before do
			login user
			visit edit_user_path(user)
		end
		describe "page" do
			it { should have_title('Edit user profile') }
		end
		describe "with valid information" do
			let(:new_name)				{ "othername" }
			let(:new_email)				{ "otheremail@gmail.com" }
			let(:new_password)		{ "bimbambom" }
			before do
				fill_in "New name",										with: new_name
				fill_in "New email",									with: new_email
				fill_in "New password",								with: new_password
				fill_in "New password confirmation", 	with: new_password
				fill_in "Current password",						with: user.password
				click_button "User update"
			end
			it { should have_title(new_name.capitalize) }
			it { should have_link('log out', href: logout_path)}
			specify { expect(user.reload.name).to eq new_name }
			specify { expect(user.reload.email).to eq new_email }
		end
	end
end