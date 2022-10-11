class User < ApplicationRecord
    has_secure_password
    has_many :friends
    has_many :friend_memories
    has_many :memories, through: :friend_memories

    validates :username, presence: true
    validates :username, uniqueness: true
end
