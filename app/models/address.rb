class Address < ApplicationRecord
    has_many :items, :dependent => :destroy
end
