class AddCreatedUserIdToMemories < ActiveRecord::Migration[7.0]
  def change
    add_column :memories, :created_user_id, :integer
  end
end
