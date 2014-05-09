json.array!(@patches) do |patch|
  json.extract! patch, :id, :name
  json.url patch_url(patch, format: :json)
end
