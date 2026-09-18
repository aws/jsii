# frozen_string_literal: true

module Jsii
  class Object
    # Introspects Ruby classes to discover and validate JSII overrides
    module Overrides
      # Discover the list of overrides this Ruby instance contributes to its
      # underlying JSII object — both subclass overrides of generated
      # methods/properties and interface implementations contributed via
      # `include`d modules.  Used by {Jsii::Object#initialize} when creating
      # the remote instance so the kernel knows which calls to dispatch back.
      #
      # @return [Array<Hash{String=>String}>] de-duplicated override descriptors,
      #   each shaped like `{ "method" => "<jsiiName>" }` or `{ "property" => "<jsiiName>" }`.
      # @raise [RuntimeError] if a required interface method is not implemented (see
      #   {Jsii::Object::Overrides#validate_interface_implementation!}).
      def jsii_overrides
        overrides = []

        scan_class_overrides!(overrides)

        overrides.uniq
      end

      private

      # Walk every ancestor class/module that declares
      # `jsii_overridable_methods` (the generator emits it on each
      # generated class) and check whether the receiving Ruby class
      # provides an override for any of them.
      #
      # @param overrides [Array<Hash>] mutable accumulator; appended in place.
      # @return [void]
      def scan_class_overrides!(overrides)
        ruby_class.ancestors.each do |source|
          next unless source.singleton_class.method_defined?(:jsii_overridable_methods, false)

          source.jsii_overridable_methods.each do |ruby_name, metadata|
            validate_override!(source, ruby_name, metadata, overrides)
          end
        end
      end

      # Decide whether the receiving class overrides one declared member,
      # push the descriptor into `overrides` when it does, and raise when a
      # non-optional interface member is missing.
      #
      # @param source    [Class, Module] the class/module declaring the member.
      # @param ruby_name [Symbol]        the snake_case Ruby method name.
      # @param metadata  [Hash]          `{ kind:, name:, is_optional: }` descriptor.
      # @param overrides [Array<Hash>]   mutable accumulator.
      # @return [void]
      # @raise [RuntimeError] when a required interface member isn't implemented.
      def validate_override!(source, ruby_name, metadata, overrides)
        is_implemented = ruby_class.method_defined?(ruby_name)
        owner = is_implemented ? ruby_class.instance_method(ruby_name).owner : nil

        overrides << { metadata[:kind].to_s => metadata[:name] } if is_implemented && native_override?(owner)

        validate_interface_implementation!(source, owner, ruby_name, metadata)
      end

      # Is the method's owner a user-supplied Ruby class/module — i.e.
      # _not_ a generated jsii class and _not_ a Ruby builtin?
      #
      # @param owner [Class, Module, nil] the `Method#owner` for the implementation.
      # @return [Boolean] `true` if the override originates outside the jsii runtime.
      def native_override?(owner)
        return false if owner.nil?

        !ruby_class.registered_class?(owner) &&
          ![Jsii::Object, Jsii::Struct, Jsii::Enum, ::Object, ::Kernel, ::BasicObject].include?(owner)
      end

      # Raise when an interface-declared required member is not implemented
      # by the receiver.  No-op for class-declared members, optional
      # members, or members implemented by the user / by another interface.
      #
      # @param source    [Class, Module] the declaring class/module.
      # @param owner     [Class, Module, nil] the resolved implementation owner.
      # @param ruby_name [Symbol] the Ruby method name.
      # @param metadata  [Hash]   `{ is_optional:, ... }` descriptor.
      # @return [nil]
      # @raise [RuntimeError] when a required interface member is missing.
      def validate_interface_implementation!(source, owner, ruby_name, metadata)
        return unless source.instance_of?(Module)
        return if metadata[:is_optional]
        return if native_override?(owner)
        return unless owner.nil? || owner.instance_of?(Module)

        raise "Object of class #{ruby_class} is missing required method/property: " \
              "#{ruby_name} (from interface #{source.name})"
      end

    end
  end
end
