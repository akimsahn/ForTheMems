class Friend < ApplicationRecord
    belongs_to :user
    has_many :friend_memories, dependent: :destroy
    has_many :memories, through: :friend_memories

    validates :full_name, presence: true
    validates :full_name, uniqueness: { scope: :user_id }
    validate :last_hang_out_cannot_be_in_future
    validate :birthday_cannot_be_in_future

    def last_hang_out_cannot_be_in_future
        if last_hang_out.present? && last_hang_out > Date.today
          errors.add(:last_hang_out, "cannot be in the future")
        end
    end    

    def birthday_cannot_be_in_future
      if birthday.present? && birthday > Date.today
        errors.add(:birthday, "cannot be in the future")
      end
    end  
end
