class CreateTasks < ActiveRecord::Migration
  def change
    create_table :tasks do |t|
    	t.integer :user_id
      t.string :name
      t.time :max_work_time
      t.date :timeout
      

      t.timestamps
    end
    add_index :tasks, :user_id
  end
end
