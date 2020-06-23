class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street_number, :city, :state, :zip_code
  had_many :items
end
