# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

address1 = Address.create(street_number: "3636", street_name: "Hartford Stteet", zip_code: "63116")
# address2 = Address.create(street_number: "3943", street_name: "Juniata Street", zip_code: "63116")
# address3 = Address.create(street_number: "3311", street_name: "Wyoming Ave", zip_code: "63116")
# address4 = Address.create(street_number: "3618", street_name: "Utah Ave", zip_code: "63116")

items1 = Item.create(name: "scrap metal", address_id: 1)
# items2 = Item.create(name: "couch", address_id: 1)
# items3 = Item.create(name: "old desk", address_id: 2)
# items4 = Item.create(name: "glassware", address_id: 2)
# items5 = Item.create(name: "old clothes", address_id: 2)
# items6 = Item.create(name: "assortment of plants", address_id: 3)

