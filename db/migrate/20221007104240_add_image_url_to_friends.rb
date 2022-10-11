class AddImageUrlToFriends < ActiveRecord::Migration[7.0]
  def change
    add_column :friends, :image_url, :string
  end
end
