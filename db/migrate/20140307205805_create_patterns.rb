class CreatePatterns < ActiveRecord::Migration
  def change
    create_table :patterns do |t|
      t.string :name
      t.integer :beats
      t.integer :steps
      t.integer :channels
      t.string :hex

      t.timestamps
    end
  end
end
