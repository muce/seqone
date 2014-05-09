json.array!(@instrument_patches) do |instrument_patch|
  json.extract! instrument_patch, :id, :instrument_id, :patch_id
  json.url instrument_patch_url(instrument_patch, format: :json)
end
