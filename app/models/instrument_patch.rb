class InstrumentPatch < ActiveRecord::Base
  belongs_to :instrument
  belongs_to :patch
end
