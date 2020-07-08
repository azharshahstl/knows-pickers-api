class ItemsController < ApplicationController

    def index 
        items = Items.all 
        render json: items
    end 

    def show 
        item = Item.find_by(params[:id])
        render json: item
    end 

    def create 
        address = Address.find(params[address_id])
        item = address.build({name: name})
        item.save
        render json: item
    end 

    private 

    def items_params 
        params.require(:adress).permit(:name)
end
