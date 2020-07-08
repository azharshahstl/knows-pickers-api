class ItemsController < ApplicationController

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

    private 

    def items_params 
        params.permit(:address_id, :name)
    end
end
