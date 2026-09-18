require 'jsii'
require 'json'

RSpec.configure do |config|
  config.color = true
  config.formatter = :documentation

  config.before(:suite) do
    # Set NODE_PATH before anything else touches Jsii::Kernel
    root_node_modules = File.expand_path('../../../../node_modules', __dir__)
    if ENV['NODE_PATH']
      ENV['NODE_PATH'] = "#{root_node_modules}#{File::PATH_SEPARATOR}#{ENV['NODE_PATH']}"
    else
      ENV['NODE_PATH'] = root_node_modules
    end

    # Add the generated lib to the load path
    lib_path = File.expand_path('../lib/ruby/lib', __dir__)
    $LOAD_PATH.unshift(lib_path)
    $LOAD_PATH.unshift(File.join(lib_path, '@scope'))

    # Load the assemblies into the kernel
    kernel = Jsii::Kernel.instance
    
    # Assembly order matters for dependencies
    assemblies = [
      '@scope/jsii-calc-base-of-base',
      '@scope/jsii-calc-base',
      '@scope/jsii-calc-lib',
      'jsii-calc'
    ]

    assemblies.each do |name|
      # Extract base name from scoped name
      base_name = name.split('/').last
      # Find the tarball for this assembly
      tarball_path = Dir.glob(File.join(lib_path, "**", "#{base_name}@*.jsii.tgz")).first
      
      if tarball_path
        # Extract version from filename: name@version.jsii.tgz
        version = File.basename(tarball_path).split('@').last.gsub('.jsii.tgz', '')
        puts "DEBUG: Loading assembly #{name} version #{version} from #{tarball_path}" if ENV['JSII_DEBUG']
        kernel.load_assembly(name, version, tarball_path)
      else
        puts "WARN: Could not find tarball for assembly #{name}" if ENV['JSII_DEBUG']
      end
    end

    # Require the generated code
    require '@scope/jsii-calc-base-of-base'
    require '@scope/jsii-calc-base'
    require '@scope/jsii-calc-lib'
    require 'jsii-calc'
  end

  config.after(:suite) do
    Jsii::Kernel.instance.shutdown
  end
end

# Shared native fixture classes (registers another before(:suite) hook, which
# runs after the assembly-loading hook above).
require_relative 'support/fixtures'
