class FriendMemory < ApplicationRecord
    belongs_to :user
    belongs_to :memory
    belongs_to :friend, optional: true

    validates :friend_username, presence: true, if: :friend_is_user?

    def self.find_friend_memories_with_user_memory_pair(user_id, memory_id)
        FriendMemory.all.where(user_id: user_id, memory_id: memory_id)
    end
end
