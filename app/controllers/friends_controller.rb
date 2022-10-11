class FriendsController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :invalid

    def index
        user = find_user
        render json: user.friends, status: :ok
    end

    def show
        friend = find_friend
        if friend.user_id == session[:user_id]
            render json: friend.memories, status: :ok
        else
            render json: { errors: ['Not authorized'] }, status: :unauthorized
        end
    end

    def create
        user = find_user
        friend = Friend.new(friend_params)
        user.friends << friend
        friend.save!
        render json: friend, status: :created
    end

    def update
        friend = find_friend
        if friend.user_id == session[:user_id]
            friend.update!(last_hang_out: params[:last_hang_out])
            render json: friend, status: :ok
        else
            render json: { errors: ['Not authorized'] }, status: :unauthorized
        end
    end

    def destroy
        friend = find_friend
        friend.destroy
        render json: friend
    end

    private

    def find_user
        User.find(session[:user_id])
    end

    def find_friend
        Friend.find(params[:id])
    end

    def friend_params
        params.permit(:full_name, :birthday, :last_hang_out, :image_url)
    end
    
    def authorize
        render json: { errors: ['Not authorized'] }, status: :unauthorized unless session.include? :user_id
    end

    def invalid(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
