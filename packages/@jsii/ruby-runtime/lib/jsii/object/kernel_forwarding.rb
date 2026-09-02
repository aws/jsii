# frozen_string_literal: true

module Jsii
  class Object
    # Direct forwarding of method and property invocations to the JSII kernel
    module KernelForwarding
      # Invoke an instance method on this proxy's underlying JSII object.
      #
      # @param method [String] the JSII method name (camelCase wire form).
      # @param args   [Array] positional arguments (Ruby values, serialized internally).
      # @return [Object] the method's return value (deserialized to native Ruby).
      def jsii_call_method(method, args = [])
        Jsii::Kernel.instance.call_method(self, method, args)
      end

      # Invoke an async instance method on this proxy's underlying JSII object,
      # blocking until the remote promise settles.
      #
      # @param method [String] the JSII async method name (camelCase wire form).
      # @param args   [Array] positional arguments (Ruby values, serialized internally).
      # @return [Object] the resolved promise value (deserialized to native Ruby).
      # @raise [Jsii::RuntimeError] if the promise rejects.
      def jsii_async_call_method(method, args = [])
        Jsii::Kernel.instance.call_async_method(self, method, args)
      end

      # Read an instance property on this proxy's underlying JSII object.
      #
      # @param property [String] the JSII property name (camelCase wire form).
      # @return [Object] the property value (deserialized to native Ruby).
      def jsii_get_property(property)
        Jsii::Kernel.instance.get_property(self, property)
      end

      # Write an instance property on this proxy's underlying JSII object.
      #
      # @param property [String] the JSII property name (camelCase wire form).
      # @param value    [Object] the value to assign (Ruby value, serialized internally).
      # @return [Hash] the kernel's `ok` response envelope.
      def jsii_set_property(property, value)
        Jsii::Kernel.instance.set_property(self, property, value)
      end
    end
  end
end
