require 'json'
package_json_path = File.join(File.dirname(__FILE__), '..', 'package.json')
pkg = JSON.parse(File.read(package_json_path))

Gem::Specification.new do |s|
  s.name = 'jsii_runtime'
  s.version = pkg['version']
  s.licenses = pkg['license']
  s.summary = pkg['description']
  s.authors = pkg['author']
  s.files = Dir['lib/**']
  puts s.files
  s.require_paths = ['lib']
end
