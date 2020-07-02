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
        params.permit(:street_number, :street_name, :zip_code)
    end
end
