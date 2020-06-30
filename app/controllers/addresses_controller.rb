class AddressesController < ApplicationController

    def index 
        addresses = Address.all 
        render json: addresses
    end 

    def show 
        address = Address.find_by(params[:id])
        render json: address 
    end 

    def create 
        address = Address.create(address_params)
        render json: address
    end 


    private 

    def address_params 
        params.require(:address).permit(:street_number, :street_name, :city, :state, :zip_code)
    end
end
