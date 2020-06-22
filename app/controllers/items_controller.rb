class ItemsController < ApplicationController

    def show 
        item = Item.find_by(id: params[:id])
        render json: item.to_json()
    end 

end
