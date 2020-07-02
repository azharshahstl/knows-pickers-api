class RemoveStateFromAddresses < ActiveRecord::Migration[6.0]
  def change
    remove_column :addresses, :state, :string
  end
end
