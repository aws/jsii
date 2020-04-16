# frozen_string_literal: true

require 'json'
package_json_path = File.join(File.dirname(__FILE__), '..', 'package.json')
pkg = JSON.parse(File.read(package_json_path))

Gem::Specification.new do |s|
  s.name = 'jsii_runtime'
  s.version = pkg['version']
  s.license = 'Apache-2.0'
  s.summary = 'Ruby client for jsii runtime'
  s.authors = 'Amazon Web Services'
  s.email = 'aws-jsii@amazon.com'
  s.homepage = 'https://github.com/aws/jsii'
  s.files = Dir['lib/**']
  s.require_paths = ['lib']
  s.required_ruby_version = '>= 2.4'

  s.requirements << 'node >= 8.11.0'

  s.add_development_dependency 'rubocop', '~> 0.82.0'
  s.add_development_dependency 'test-unit', '~> 3.3.3'
end
