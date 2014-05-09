class Patch < ActiveRecord::Base
  has_many :instrument_patches
  has_many :instruments, through => :instrument_patches
end
