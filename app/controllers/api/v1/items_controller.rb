class Api::V1::ItemsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]
    def index 
        items = Item.all 
        render json: items
    end 

    def show 
        item = Item.find_by(params[:id])
        render json: item
    end 

    def create 
        address = Address.find(params[:address_id])
        item = address.items.build(name: params[:name])
        item.save
        render json: address
    end 

    def destroy 
        item = Item.find(params[:id])
        item.destroy 
    end

    private 

    def items_params 
        params.permit(:address_id, :name)
    end
end
