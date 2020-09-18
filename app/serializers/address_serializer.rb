class AddressSerializer < ActiveModel::Serializer
  attributes :id, :street_number, :street_name, :zip_code
  has_many :items
  # belongs_to :user
end
