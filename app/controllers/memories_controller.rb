class MemoriesController < ApplicationController
    before_action :authorize
    rescue_from ActiveRecord::RecordInvalid, with: :invalid

    def index
        user = find_user
        memories = user.memories.group(:id)
        render json: memories, status: :ok
    end

    def create
        memory = Memory.create!(
            date: params[:date],
            image_url: params[:image_url],
            comment: params[:comment],
            created_user_id: session[:user_id]
        )
        render json: memory, status: :created
    end

    def destroy
        user = find_user
        memory = find_memory
        if memory.created_user_id == user.id
            memory.destroy
            render json: memory, status: :ok
        else
            friend_memories = FriendMemory.find_friend_memories_with_user_memory_pair(user_id, memory_id)
            friend_memories.destroy_all
            render json: memory, status: :ok
        end
    end
    
    private

    def find_user
        User.find(session[:user_id])
    end

    def find_memory
        Memory.find(params[:id])
    end
    
    def authorize
        render json: { errors: ['Not authorized'] }, status: :unauthorized unless session.include? :user_id
    end

    def invalid(invalid)
        render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
    end
end
