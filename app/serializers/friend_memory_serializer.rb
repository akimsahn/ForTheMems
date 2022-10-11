class FriendMemorySerializer < ActiveModel::Serializer
  attributes :user_id, :memory_id, :friend_id, :friend_is_user, :friend_username
end
