# frozen_string_literal: true

require 'json'
package = JSON.parse(File.read(File.expand_path('package.json', __dir__)))

Gem::Specification.new do |s|
  s.name        = 'jsii-ruby-runtime'
  s.version     = package['version']
  s.summary     = package['description'] || 'Official JSII core runtime engine for Ruby'
  s.authors     = [package['author'] || 'JSII Generator']
  s.license     = package['license'] || 'Apache-2.0'
  s.files       = Dir['lib/**/*.rb'] + Dir['sig/**/*.rbs']
  s.required_ruby_version = '>= 3.3.0'
  s.add_dependency 'base64', '~> 0.2'

  s.add_development_dependency 'rake', '~> 13.0'
  s.add_development_dependency 'rubocop', '~> 1.86'
  s.add_development_dependency 'yard', '~> 0.9'
end
