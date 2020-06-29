class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_one :address
end
