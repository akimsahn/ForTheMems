class CreateFriendMemories < ActiveRecord::Migration[7.0]
  def change
    create_table :friend_memories do |t|
      t.integer :user_id
      t.integer :memory_id
      t.integer :friend_id
      t.boolean :friend_is_user
      t.string :friend_username
      t.timestamps
    end
  end
end
