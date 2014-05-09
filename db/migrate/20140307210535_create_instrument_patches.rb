class CreateInstrumentPatches < ActiveRecord::Migration
  def change
    create_table :instrument_patches do |t|
      t.integer :instrument_id
      t.integer :patch_id

      t.timestamps
    end
  end
end
