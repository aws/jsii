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
        scan_interface_overrides!(overrides)

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

      # Walk every registered interface module the receiving class includes
      # and inspect each instance method to detect user-supplied overrides
      # (uses MRI bytecode introspection — see {#scan_interface_override!}).
      #
      # @param overrides [Array<Hash>] mutable accumulator; appended in place.
      # @return [void]
      def scan_interface_overrides!(overrides)
        ruby_class.ancestors.each do |ancestor|
          next unless ancestor.instance_of?(Module) && ruby_class.registered_class?(ancestor)

          ancestor.public_instance_methods(false).each do |ruby_name|
            scan_interface_override!(ancestor, ruby_name, overrides)
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

      # For one specific interface method, detect whether the receiver
      # provides a user override; when it does, recover the JSII name + kind
      # by disassembling the interface module's instance method (because
      # the interface module itself holds the canonical `jsii_call_method`
      # / `jsii_get_property` bytecode the generator emitted).
      #
      # @param ancestor  [Module] the interface module declaring the member.
      # @param ruby_name [Symbol] the Ruby method name (snake_case).
      # @param overrides [Array<Hash>] mutable accumulator; appended on hit.
      # @return [void]
      def scan_interface_override!(ancestor, ruby_name, overrides)
        return unless ruby_class.method_defined?(ruby_name)

        owner = ruby_class.instance_method(ruby_name).owner
        return unless native_override?(owner)

        disasm = extract_disasm(ancestor, ruby_name)
        return unless disasm

        kind = determine_override_kind(disasm)
        jsii_name = disasm[/putstring\s+"([^"]+)"/, 1]

        overrides << { kind.to_s => jsii_name } if kind && jsii_name
      end

      # Disassemble the interface module's instance method body so the
      # caller can scan the bytecode for the canonical JSII member name and
      # call kind.  MRI-only — see {#require_mri_runtime!}.
      #
      # @param ancestor  [Module] the interface module.
      # @param ruby_name [Symbol] the Ruby method name.
      # @return [String, nil] the disassembled bytecode, or `nil` if introspection fails.
      def extract_disasm(ancestor, ruby_name)
        require_mri_runtime!

        begin
          original_method = ancestor.instance_method(ruby_name)
          RubyVM::InstructionSequence.of(original_method).disasm
        rescue StandardError
          nil
        end
      end

      # Guard that aborts cleanly when running on an interpreter without
      # `RubyVM::InstructionSequence` (JRuby, TruffleRuby), which is needed
      # for interface override discovery.
      #
      # @return [nil] when running on MRI / CRuby.
      # @raise [RuntimeError] on every other interpreter.
      def require_mri_runtime!
        return if defined?(RubyVM::InstructionSequence)

        raise 'jsii-ruby-runtime requires MRI (CRuby) — RubyVM::InstructionSequence ' \
              "is not available on #{defined?(RUBY_ENGINE) ? RUBY_ENGINE : 'this Ruby implementation'}, " \
              'so interface override discovery cannot work. Switch to MRI to use jsii-generated Ruby bindings.'
      end

      # Classify a disassembled method body as a property override or a
      # method override based on which generator-emitted helper it calls.
      #
      # @param disasm [String] the bytecode dump from {#extract_disasm}.
      # @return [Symbol, nil] `:property`, `:method`, or `nil` if neither pattern is found.
      def determine_override_kind(disasm)
        if disasm.include?('jsii_get_property') || disasm.include?('jsii_set_property')
          :property
        elsif disasm.include?('jsii_call_method') || disasm.include?('jsii_async_call_method')
          :method
        end
      end
    end
  end
end
