class AddressesController < ApplicationController

    def index 
        addresses = Address.all 
        render json: addresses
    end 

    def show 
        address = Address.find(params[:id])
        render json: address 
    end 

    def create 
        address = Address.create(address_params)
        render json: address
    end 

    def destroy 
        address = Address.find(params[:id])
        address.destroy 
    end


    private 

    def address_params 
        params.require(:address).permit(:street_number, :street_name, :zip_code)
    end
end
