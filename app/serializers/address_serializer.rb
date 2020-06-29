class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street_number, :street_name, :city, :state, :zip_code
  has_many :items
end
