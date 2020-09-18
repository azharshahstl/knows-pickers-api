class Api::V1::UsersController < ApplicationController
    skip_before_action :authorized, only: [:create]

    def create 
        user = User.create(user_params)
            if user.valid?
                token = encode_token(user_id: user.id)
                render json: { user: user, jwt: token }, status: :created
            else 
                render json: { error: 'Email was left blank or is already taken' }, status: :not_acceptable
            end

    end

    def index 
        users = User.all 
        render json: users
    end

    def user_params 
        params.require(:user).permit(:email, :password)
    end


end