# frozen_string_literal: true

module Jsii
  class Kernel
    # Handles executing callbacks from the JSII Node sidecar in the Ruby runtime
    module Callbacks
      private

      # Service one synchronous callback the sidecar emitted mid-request and
      # send the `complete` envelope back over the pipe.  Errors are
      # converted to `{ err, name, stack }` rather than re-raised — see the
      # inline comment for why re-raising would corrupt the read loop.
      #
      # @param callback [Hash{String=>Object}] the callback descriptor
      #   (`{ cbid, invoke | get | set: {...} }`).
      # @return [nil]
      def process_callback_request(callback)
        result = handle_callback(callback)

        send_payload({
          complete: {
            cbid: callback['cbid'],
            result: Jsii::Serializer.dump(result)
          }
        })
      rescue StandardError => e
        # Notify the kernel that this callback failed so it can unblock the
        # pending request.  Without this the Node sidecar waits forever for a
        # { complete } envelope and the original Ruby call deadlocks.
        #
        # Do NOT re-raise here.  The kernel will process the error envelope and
        # reply with { error: "..." } as the final response for the original
        # request.  The normal request loop will read that reply and
        # check_error! will raise Jsii::RuntimeError at the right time.
        # Re-raising here would exit the loop early, leaving the kernel's
        # { error } response unread and polluting the next request's read.
        send_payload({
          complete: {
            cbid: callback['cbid'],
            err: e.message,
            name: e.class.name,
            stack: e.backtrace&.join("\n")
          }
        })
      end

      # Dispatch a callback descriptor to the right concrete handler based
      # on which key it carries (`invoke` / `get` / `set`).
      #
      # @param callback [Hash{String=>Object}] the callback descriptor.
      # @return [Object] the value to send back as the `result` field.
      # @raise [RuntimeError] when the descriptor carries none of the
      #   expected keys.
      def handle_callback(callback)
        if callback['invoke']
          handle_callback_invoke(callback['invoke'])
        elsif callback['get']
          handle_callback_get(callback['get'])
        elsif callback['set']
          handle_callback_set(callback['set'])
        else
          raise "Unknown callback type: #{callback.inspect}"
        end
      end

      # Invoke a Ruby-side override the sidecar is requesting on a created
      # object.  Uses `ruby_member_name` so JSII members that collide with
      # Ruby reserved words / `Object#send` route to the generator's
      # `_break` / `_send` form instead of the wrong dispatch.
      #
      # @param invoke_req [Hash{String=>Object}] `{ objref, method, args }`.
      # @return [Object] the value returned by the Ruby method (before serialization).
      # @raise [RuntimeError] if no live instance is registered for `objref`.
      def handle_callback_invoke(invoke_req)
        objref = invoke_req['objref']
        method_name = invoke_req['method']
        args = invoke_req['args'] || []

        instance = Jsii::Object.find_by_ref(objref)
        raise "Object not found for ref: #{objref}" unless instance

        # `ruby_member_name` (not bare `underscore`) so reserved-name members
        # like `break` / `send` route to the generator's `_break` / `_send`
        # rather than `Object#send` or a NoMethodError.  Use __send__ so a
        # user override that happens to define `send` can't shadow dispatch.
        ruby_method = Jsii::Utils.ruby_member_name(method_name)
        instance.__send__(ruby_method, *Jsii::Serializer.load(args))
      end

      # Read a Ruby-side override property the sidecar is requesting.
      #
      # @param get_req [Hash{String=>Object}] `{ objref, property }`.
      # @return [Object] the property value (before serialization).
      # @raise [RuntimeError] if no live instance is registered for `objref`.
      def handle_callback_get(get_req)
        objref = get_req['objref']
        property = get_req['property']

        instance = Jsii::Object.find_by_ref(objref)
        raise "Object not found for ref: #{objref}" unless instance

        ruby_property = Jsii::Utils.ruby_member_name(property)
        instance.__send__(ruby_property)
      end

      # Write a Ruby-side override property the sidecar is requesting.
      #
      # @param set_req [Hash{String=>Object}] `{ objref, property, value }`.
      # @return [nil] always; the `complete` envelope carries no result for setters.
      # @raise [RuntimeError] if no live instance is registered for `objref`.
      def handle_callback_set(set_req)
        objref = set_req['objref']
        property = set_req['property']
        value = set_req['value']

        instance = Jsii::Object.find_by_ref(objref)
        raise "Object not found for ref: #{objref}" unless instance

        ruby_property_setter = "#{Jsii::Utils.ruby_member_name(property)}="
        instance.__send__(ruby_property_setter, Jsii::Serializer.load(value))
        nil
      end

      # Collect every ancestor of `value`'s class that carries a JSII fqn —
      # i.e. the included `IFoo` / extended struct modules the generator
      # emitted.
      #
      # @param value [Object] the value to introspect.
      # @return [Array<Module>] matching ancestor modules in order.
      def value_ancestors(value)
        value.class.ancestors.select do |m|
          m.instance_of?(Module) && m.respond_to?(:jsii_fqn)
        end
      end

      # Materialize a plain Ruby object that implements JSII interfaces into
      # a remote by-ref by registering it with the kernel as a freshly
      # created `Object` with `overrides` + `interfaces` derived from the
      # value's class.  Mutates `value` to attach the resulting `@jsii_ref`
      # and a `jsii_ref` reader so future serializations are by-ref.
      #
      # @param value [Object] the Ruby value to register remotely.
      # @return [Object, Hash{String=>String}] either the original `value`
      #   (when no JSII interfaces are present, so nothing to do) or the
      #   `{ "$jsii.byref" => ref }` wire envelope.
      def serialize_native_implementations(value)
        jsii_interface_modules = value_ancestors(value)
        return value if jsii_interface_modules.empty?

        overrides = extract_native_overrides(value, jsii_interface_modules)
        jsii_interfaces = jsii_interface_modules.map(&:jsii_fqn)
        ref = create_object('Object', [], overrides: overrides, interfaces: jsii_interfaces, instance: value)
        value.instance_variable_set(:@jsii_ref, ref)
        value.define_singleton_method(:jsii_ref) { @jsii_ref }
        Jsii::Object.register_instance(value) if Jsii::Object.respond_to?(:register_instance)
        { '$jsii.byref' => ref }
      end

      # Walk every JSII interface module in the value's ancestor chain and
      # accumulate the override descriptors the kernel needs to know about.
      #
      # @param value                  [Object]         the implementing Ruby instance.
      # @param jsii_interface_modules [Array<Module>]  result of {#value_ancestors}.
      # @return [Array<Hash>] override descriptors (`{ "method" => ... }` / `{ "property" => ... }`).
      # @raise [RuntimeError] if a required interface member isn't implemented.
      def extract_native_overrides(value, jsii_interface_modules)
        overrides = []
        jsii_interface_modules.each do |interface|
          next unless interface.singleton_class.method_defined?(:jsii_overridable_methods, false)

          interface.jsii_overridable_methods.each do |ruby_name, metadata|
            validate_override!(value, interface, ruby_name, metadata, overrides)
          end
        end
        overrides.uniq
      end

      # Verify that `value` implements one declared interface member, and
      # — when it does and the implementation is user code (not the
      # generator's own module) — push an override descriptor into
      # `overrides`.
      #
      # @param value     [Object]   the implementing Ruby instance.
      # @param interface [Module]   the interface module declaring the member.
      # @param ruby_name [Symbol]   the snake_case Ruby method name.
      # @param metadata  [Hash]     `{ kind: :method|:property, name: <jsiiName>, is_optional: Boolean }`.
      # @param overrides [Array]    mutable accumulator; appended in place.
      # @return [void]
      # @raise [RuntimeError] when a required (non-optional) member is missing.
      def validate_override!(value, interface, ruby_name, metadata, overrides)
        unless value.class.method_defined?(ruby_name)
          return if metadata[:is_optional]

          raise "Object of class #{value.class} is missing required method/property: " \
                "#{ruby_name} (from interface #{interface.name})"
        end

        # If the owner is not a JSII generated class/module, it's a user override
        owner = value.method(ruby_name).owner
        overrides << { metadata[:kind].to_s => metadata[:name] } unless owner.respond_to?(:jsii_fqn)
      end
    end
  end
end
