class AddressesController < ApplicationController

    def show 
        address = Address.find_by(:id params[:id])
        render json: address.to_json()
    end
end
