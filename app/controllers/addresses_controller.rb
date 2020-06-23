class AddressesController < ApplicationController

    def show 
        address = Address.find_by(id: params[:id]) 
        render json: address
    end

    def index 
        addresses = Address.all
        render json: addresses
    end 
end
