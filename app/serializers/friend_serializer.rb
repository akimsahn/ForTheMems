class FriendSerializer < ActiveModel::Serializer
  attributes :id, :full_name, :birthday, :last_hang_out, :image_url
end
