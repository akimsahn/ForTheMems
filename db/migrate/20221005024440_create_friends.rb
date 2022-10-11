class CreateFriends < ActiveRecord::Migration[7.0]
  def change
    create_table :friends do |t|
      t.string :full_name
      t.date :birthday
      t.date :last_hang_out
      t.integer :user_id
      t.timestamps
    end
  end
end
