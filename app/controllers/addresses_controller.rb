class AddressesController < ApplicationController

    def show 
        address = Address.find_by(id: params[:id]) 
        render json: address
    end

    def index 
        addresses = Address.all
        render json: addresses
    end 

    def create 
        address = Address.create(address_params)
        render json: address
    end 


    private 

    def address_params
        params.require(:address).permit(:street_number, :city, :state, :zip_code)
    end

end
