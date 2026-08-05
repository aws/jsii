# frozen_string_literal: true

module Jsii
  # Represents a JSII assembly loaded into the runtime.
  class Assembly
    # @return [String] the npm-style package name of the assembly (e.g. `"jsii-calc"`).
    attr_reader :name

    # @return [String] the assembly's semantic version (e.g. `"3.20.120"`).
    attr_reader :version

    # @return [String] absolute filesystem path to the `.jsii.tgz` tarball backing this assembly.
    attr_reader :tarball

    # @param name    [String] the npm-style package name of the assembly.
    # @param version [String] the assembly's semantic version.
    # @param tarball [String] absolute filesystem path to the `.jsii.tgz` tarball.
    # @return [Assembly] a new wrapper around the supplied metadata.
    def initialize(name, version, tarball)
      @name = name
      @version = version
      @tarball = tarball
    end

    # Loads the given assembly into the JSII kernel and returns a wrapper.
    #
    # @param name    [String] the npm-style package name of the assembly.
    # @param version [String] the assembly's semantic version.
    # @param tarball [String] absolute filesystem path to the `.jsii.tgz` tarball.
    # @return [Assembly] a wrapper representing the loaded assembly.
    # @raise [Jsii::RuntimeError] if the kernel rejects the load request.
    def self.load(name, version, tarball)
      # Trigger the loading of the given assembly in the JSII kernel.
      Jsii::Kernel.instance.load_assembly(name, version, tarball)
      new(name, version, tarball)
    end
  end
end
