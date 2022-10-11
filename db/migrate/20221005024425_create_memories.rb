class CreateMemories < ActiveRecord::Migration[7.0]
  def change
    create_table :memories do |t|
      t.date :date
      t.string :image_url
      t.string :comment
      t.timestamps
    end
  end
end
