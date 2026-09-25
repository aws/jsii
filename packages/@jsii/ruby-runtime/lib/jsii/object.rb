# frozen_string_literal: true

require 'jsii/object/registry'
require 'jsii/object/overrides'
require 'jsii/object/dynamic_invocation'
require 'jsii/object/kernel_forwarding'

module Jsii
  # Extension to allow modules (Interfaces/Structs) to have jsii_fqn
  module FqnExtension
    # @!attribute [rw] jsii_fqn
    #   @return [String, nil] the JSII fully-qualified name attached to this module/class.
    attr_accessor :jsii_fqn
  end

  # Base class for all Ruby proxy classes that map to JSII-managed objects.
  class Object
    extend FqnExtension
    extend Registry

    include KernelForwarding
    include Overrides
    include DynamicInvocation

    # @return [String] the `$jsii.byref` handle for this proxied instance.
    attr_reader :jsii_ref

    # Encodes this proxy as a `$jsii.byref` wire envelope.
    #
    # @return [Hash{String=>Object}] `{ "$jsii.byref" => "<handle>", "$jsii.interfaces" => [...] }`.
    def jsii_serialize
      res = { '$jsii.byref' => jsii_ref }
      if (interfaces = jsii_interfaces) && !interfaces.empty?
        res['$jsii.interfaces'] = interfaces
      end
      res
    end

    # Allocate the corresponding object inside the JSII sidecar and store its
    # ref locally.  Subclasses do NOT typically override this — the pacmak
    # generator emits a thin `initialize(arg1, arg2, ...)` that forwards via
    # `super`, ultimately landing here.
    #
    # @param args [Array] positional constructor arguments (Ruby values).
    # @yieldparam instance [Jsii::Object] the freshly-constructed instance, for caller post-init.
    # @return [Jsii::Object] `self` (returned implicitly by `initialize`).
    # @raise [Jsii::RuntimeError] if the kernel rejects the construction.
    def initialize(*args)
      # Ask the singleton to create the remote object and store its reference ID
      @jsii_ref = Jsii::Kernel.instance.create_object(ruby_class.jsii_fqn,
                                                      args,
                                                      overrides: jsii_overrides,
                                                      interfaces: jsii_interfaces,
                                                      instance: self)
      ruby_class.register_instance(self)
      yield self if block_given?
    end

    # The set of JSII interface FQNs this Ruby instance is declared to
    # implement, gathered from every module in its ancestor chain that
    # carries a `jsii_fqn`.
    #
    # @return [Array<String>] de-duplicated list of interface FQNs.
    def jsii_interfaces
      # Find all included modules that have a jsii_fqn
      singleton_class.ancestors
                .select { |a| a.is_a?(Module) && !a.is_a?(Class) && a.respond_to?(:jsii_fqn) && a.jsii_fqn }
                .map(&:jsii_fqn)
                .uniq
    end

    # Returns the *true* class of `self`, bypassing any user-defined `#class`
    # override (the JSII method-missing path otherwise dispatches `class`
    # over the wire when a remote member happens to be named `class`).
    #
    # @return [Class] the real Ruby class of this instance.
    def ruby_class
      ::Object.instance_method(:class).bind(self).call
    end
  end
end
