class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.integer :task_id
      t.time :work_time

      t.timestamps
    end
    add_index :days, :task_id
  end
end
