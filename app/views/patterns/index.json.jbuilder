json.array!(@patterns) do |pattern|
  json.extract! pattern, :id, :name, :beats, :steps, :hex
  json.url pattern_url(pattern, format: :json)
end
