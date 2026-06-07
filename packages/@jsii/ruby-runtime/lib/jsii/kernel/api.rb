# frozen_string_literal: true

module Jsii
  class Kernel
    # Core public APIs exposed by the Kernel to interact with JSII
    module Api
      # Tell the sidecar to load a JSII assembly from a tarball.
      #
      # @param name    [String] npm-style package name (e.g. `"jsii-calc"`).
      # @param version [String] semantic version of the assembly.
      # @param tarball [String] absolute path to the `.jsii.tgz` tarball.
      # @return [Hash] the kernel's `ok` response envelope.
      # @raise [Jsii::RuntimeError] if loading fails.
      def load_assembly(name, version, tarball)
        request({
          api: 'load',
          name: name,
          version: version,
          tarball: tarball
        })
      end

      # Instantiate a JSII object in the sidecar and return its by-reference id.
      # The `instance:` argument (if provided) is pushed onto the per-thread
      # pending-object stack for the duration of the call so that callbacks
      # the kernel fires _during_ construction can resolve back to the Ruby
      # instance even though the registry hasn't seen the new ref yet.
      #
      # @param fqn        [String] fully-qualified name of the class to construct.
      # @param args       [Array] positional constructor arguments (Ruby values, serialized internally).
      # @param overrides  [Array<Hash>] override descriptors emitted by the generator / discovered at runtime.
      # @param interfaces [Array<String>] additional interface FQNs the instance implements.
      # @param instance   [Jsii::Object, nil] the in-flight Ruby instance to expose to callbacks.
      # @return [String] the `$jsii.byref` handle for the new object.
      def create_object(fqn, args = [], overrides: [], interfaces: [], instance: nil)
        push_pending_object(instance)
        begin
          payload = create_object_payload(fqn, args, overrides: overrides, interfaces: interfaces)
          response = request(payload)
          # The Node sidecar returns the true tracking ID, let's use it directly
          response['$jsii.byref']
        ensure
          pop_pending_object
        end
      end

      # Invoke an instance method on a previously-created JSII object.
      #
      # @param objref [String, Jsii::Object] the receiver or its `$jsii.byref` handle.
      # @param method [String] the JSII method name (camelCase wire form).
      # @param args   [Array] positional arguments (Ruby values, serialized internally).
      # @return [Object] the method's return value (deserialized to native Ruby).
      def call_method(objref, method, args = [])
        objref_payload = if objref.respond_to?(:jsii_serialize)
          objref.jsii_serialize
        else
          { '$jsii.byref' => objref }
        end

        response = request({
          api: 'invoke',
          objref: objref_payload,
          method: method,
          args: Jsii::Serializer.dump(args)
        })

        # Unpack the actual returned value
        Jsii::Serializer.load(response['result'])
      end

      # Read an instance property on a JSII object.
      #
      # @param objref   [String, Jsii::Object] the receiver or its `$jsii.byref` handle.
      # @param property [String] the JSII property name (camelCase wire form).
      # @return [Object] the property value (deserialized to native Ruby).
      def get_property(objref, property)
        objref_payload = if objref.respond_to?(:jsii_serialize)
          objref.jsii_serialize
        else
          { '$jsii.byref' => objref }
        end

        response = request({
          api: 'get',
          objref: objref_payload,
          property: property
        })
        Jsii::Serializer.load(response['value'])
      end

      # Write an instance property on a JSII object.
      #
      # @param objref   [String, Jsii::Object] the receiver or its `$jsii.byref` handle.
      # @param property [String] the JSII property name (camelCase wire form).
      # @param value    [Object] the value to assign (Ruby value, serialized internally).
      # @return [Hash] the kernel's `ok` response envelope.
      def set_property(objref, property, value)
        objref_payload = if objref.respond_to?(:jsii_serialize)
          objref.jsii_serialize
        else
          { '$jsii.byref' => objref }
        end

        request({
          api: 'set',
          objref: objref_payload,
          property: property,
          value: Jsii::Serializer.dump(value)
        })
      end

      # Invoke a static method on a JSII class.
      #
      # @param fqn    [String] fully-qualified name of the class.
      # @param method [String] the JSII static method name.
      # @param args   [Array] positional arguments (Ruby values, serialized internally).
      # @return [Object] the method's return value (deserialized to native Ruby).
      def call_static(fqn, method, args = [])
        response = request({
          api: 'sinvoke',
          fqn: fqn,
          method: method,
          args: Jsii::Serializer.dump(args)
        })
        Jsii::Serializer.load(response['result'])
      end

      # Read a static property on a JSII class.
      #
      # @param fqn      [String] fully-qualified name of the class.
      # @param property [String] the JSII static property name.
      # @return [Object] the property value (deserialized to native Ruby).
      def get_static(fqn, property)
        response = request({
          api: 'sget',
          fqn: fqn,
          property: property
        })
        Jsii::Serializer.load(response['value'])
      end

      # Write a static property on a JSII class.
      #
      # @param fqn      [String] fully-qualified name of the class.
      # @param property [String] the JSII static property name.
      # @param value    [Object] the value to assign (Ruby value, serialized internally).
      # @return [Hash] the kernel's `ok` response envelope.
      def set_static(fqn, property, value)
        request({
          api: 'sset',
          fqn: fqn,
          property: property,
          value: Jsii::Serializer.dump(value)
        })
      end
    end
  end
end
