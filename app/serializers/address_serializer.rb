class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street_number, :city, :state, :zip_code
  has_many :items
end
