# frozen_string_literal: true

# Top-level namespace for the JSII Ruby runtime.  See {Jsii::Kernel} for the
# Node sidecar bridge, {Jsii::Object} for the proxy base class, {Jsii::Struct}
# for value-typed data classes, and {Jsii::Serializer} for the wire codec.
module Jsii
  # Unsafely cast a JSII object proxy to a different JSII type/interface.
  #
  # @param obj   [Jsii::Object] the object proxy to cast.
  # @param klass [Class, Module] the target JSII class or interface module.
  # @return [Jsii::Object] a new proxy instance representing the target type.
  def self.downcast(obj, klass)
    return nil if obj.nil?
    raise TypeError, "Expected a Jsii::Object" unless obj.is_a?(Jsii::Object)

    if klass.is_a?(Class)
      instance = klass.allocate
    else
      instance = Jsii::Object.allocate.extend(klass)
    end
    instance.instance_variable_set(:@jsii_ref, obj.jsii_ref)
    Jsii::Object.register_instance(instance)
    instance
  end
end

require_relative 'jsii/errors'
require_relative 'jsii/utils'
require_relative 'jsii/kernel'
require_relative 'jsii/object'
require_relative 'jsii/enum'
require_relative 'jsii/struct'
require_relative 'jsii/serializer'
require_relative 'jsii/assembly'
require_relative 'jsii/type'
