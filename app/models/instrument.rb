class Instrument < ActiveRecord::Base
  has_many :instrument_patches
  has_many :patches, through => :instrument_patches
end
