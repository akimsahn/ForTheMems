class Memory < ApplicationRecord
    has_many :friend_memories, dependent: :destroy
    has_many :friends, through: :friend_memories
    has_many :users, through: :friend_memories

    validates :image_url, presence: :true
    validate :date_cannot_be_in_future

    def date_cannot_be_in_future
      if date.present? && date > Date.today
        errors.add(:date, "cannot be in the future")
      end
    end 
end
