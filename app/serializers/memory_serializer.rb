class MemorySerializer < ActiveModel::Serializer
  attributes :id, :date, :image_url, :comment, :created_user_id

  has_many :users
  has_many :friends, serializer: MemoryFriendSerializer
end
