class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :address_id
  has_one :address
end
