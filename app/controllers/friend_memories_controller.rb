class FriendMemoriesController < ApplicationController
    rescue_from ActiveRecord::RecordInvalid, with: :invalid
    rescue_from ActiveRecord::RecordNotFound, with: :not_found

    def create
        render json: { errors: ['Not authorized'] }, status: :unauthorized unless session.include? :user_id
        user = User.find(session[:user_id])
        params[:friend_memory].each { |input|
            if input['friend_is_user']
                friend_user = User.find_by(username: input['friend_name'])
                if !friend_user
                    render json: { errors: ["Username '#{input['friend_name']}' not found"] }, status: :not_found
                else
                    FriendMemory.create!(
                        user: user,
                        memory_id: params[:memory_id],
                        friend_is_user: true,
                        friend_username: friend_user.username
                    )
                    FriendMemory.create!(
                        user: friend_user,
                        memory_id: params[:memory_id],
                        friend_is_user: true,
                        friend_username: user.username
                    )
                    head :ok
                end
            elsif input['friend_name'] == ""
                FriendMemory.create!(
                    user: user,
                    memory_id: params[:memory_id],
                )
                head :ok
            else
                friend = Friend.find_by(full_name: input['friend_name'])
                if !friend
                    render json: { errors: ["Friend '#{input['friend_name']}' not found"] }, status: :not_found
                else
                    FriendMemory.create!(
                        user: user,
                        memory_id: params[:memory_id],
                        friend: friend
                    )
                    head :ok
                end
            end
        }
    end

    private

    def invalid(invalid)
        render json: { errors: [invalid.record.errors.full_messages] }, status: :unprocessable_entity
    end

    def not_found
        render json: { errors: ['Friend could not be found'] }, status: :not_found
    end
end
