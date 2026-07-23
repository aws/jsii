# frozen_string_literal: true

module Jsii
  # String / Symbol / value utility functions used internally by the jsii
  # runtime.  Scoped under Jsii::Utils to avoid monkey-patching core classes —
  # this means jsii-ruby-runtime can be loaded alongside ActiveSupport (or any
  # other library that defines `String#underscore`, `String#camelize`,
  # `Object#blank?`, etc.) without conflicts or surprising precedence.
  module Utils
    # Names that the pacmak ruby target rewrites by prepending an underscore
    # before emitting the generated method/property.  Must stay in sync with
    # `RUBY_RESERVED_NAMES` in packages/jsii-pacmak/lib/targets/ruby.ts; the
    # runtime side needs to apply the same renaming when dispatching kernel
    # callbacks so a JSII member named `send` finds the generated `_send`
    # method instead of falling through to `Object#send` (or `NoMethodError`
    # for keyword names like `class` / `while`).
    RUBY_RESERVED_NAMES = %w[
      alias and begin break case class def defined? do else elsif end ensure
      false for if in module next nil not or redo rescue retry return self
      super then true undef unless until when while yield
      send __send__
      initialize new allocate to_jsii ruby_class
    ].to_set.freeze

    module_function

    # Converts a camelCase or PascalCase string to snake_case.
    # Implementation adapted from ActiveSupport's String#underscore.
    #
    # @param str [String, Symbol] the value to convert.
    # @return [String] the snake_case form (a new String; the input is never mutated).
    def underscore(str)
      s = str.to_s
      return s.dup unless /[A-Z-]/.match?(s)

      word = s.gsub('::', '/')
      word.gsub!(/(?<=[A-Z])(?=[A-Z][a-z])|(?<=[a-z\d])(?=[A-Z])/, '_')
      word.tr!('-', '_')
      word.downcase!
      word
    end

    # Converts a snake_case string (or Symbol) to camelCase.
    #
    # @param str [String, Symbol] the value to convert.
    # @return [String] the camelCase form.
    def camelize(str)
      str.to_s.gsub(/_([a-z\d])/) { ::Regexp.last_match(1).upcase }
    end

    # Map a JSII member name (the wire form, e.g. `break`, `fooBar`, `2fa`)
    # to the Ruby identifier the pacmak ruby target generates for it.  Must
    # mirror the generator's `rubyName` in jsii-pacmak/lib/targets/ruby.ts:
    # snake_case the name, then prefix with `_` if the result is a Ruby
    # reserved word or starts with a digit.
    #
    # Used by the kernel callback dispatcher so an override of a reserved-
    # name interface method (e.g. `IJavaReservedWordsInAnInterface#break`,
    # generated as `_break`) is actually called.  Without this remapping
    # the kernel would `__send__(:break, ...)` and raise NoMethodError,
    # or — worse, for `send` itself — accidentally invoke `Object#send`.
    #
    # @param jsii_name [String] the JSII member name as it appears on the wire.
    # @return [String] the Ruby identifier the generator emits for that member.
    def ruby_member_name(jsii_name)
      snake = underscore(jsii_name)
      # `jsii_` is reserved for the runtime's own API surface (jsii_ref,
      # jsii_serialize, ...) — the generator prefixes any member that would
      # land in it, so callback dispatch must apply the same renaming.
      return "_#{snake}" if RUBY_RESERVED_NAMES.include?(snake) || snake.start_with?('jsii_') || /\A\d/.match?(snake)

      snake
    end

    # Returns true when the value is nil, empty, or — for strings — only
    # whitespace.  Mirrors ActiveSupport's `Object#blank?` semantics for the
    # specific types this runtime actually encounters.
    #
    # @param value [Object] the value to test.
    # @return [Boolean] `true` if blank, `false` otherwise.
    def blank?(value)
      return true if value.nil?
      return value.empty? if value.respond_to?(:empty?) && !value.is_a?(String)
      return value.empty? || value.match?(/\A[[:space:]]*\z/) if value.is_a?(String)

      false
    end

    # Coerces a Proc (or a single-entry Hash holding one) into an anonymous
    # object implementing a single-method jsii interface — the Ruby analogue
    # of TypeScript passing `{ yourTurn: (bell) => ... }` where an interface
    # is expected (structural typing), or Java passing a lambda to any
    # single-method interface (javac SAM conversion).  jsii's wire protocol
    # has no function type — callbacks are always "object implementing an
    # interface" — so the wrapper produced here rides the exact machinery
    # ordinary interface implementations use: it `include`s the module, the
    # override scanner discovers the method via `jsii_overridable_methods`,
    # and the serializer ships it as a native implementation.
    #
    # Accepted forms, for an interface whose single abstract member is the
    # method `your_turn`:
    #
    #     coerce_callable(->(bell) { bell.ring }, IBellRinger)
    #     coerce_callable({ your_turn: ->(bell) { bell.ring } }, IBellRinger)
    #
    # Anything else — including any value aimed at an interface with more
    # than one member, or with property members — is returned unchanged, so
    # generated code can call this unconditionally and let ordinary type
    # checking report non-coercible values.
    #
    # @param value [Object] the candidate value.
    # @param interface_module [Module] the generated jsii interface module.
    # @return [Object] an implementing object, or `value` unchanged.
    def coerce_callable(value, interface_module)
      return value unless interface_module.respond_to?(:jsii_overridable_methods)

      members = interface_module.jsii_overridable_methods
      return value unless members.size == 1

      ruby_name, metadata = members.first
      return value unless metadata[:kind] == :method

      callable =
        if value.is_a?(Proc)
          value
        elsif value.is_a?(Hash) && value.size == 1 && value[ruby_name].is_a?(Proc)
          value[ruby_name]
        end
      return value if callable.nil?

      wrapper = Class.new do
        include interface_module
        define_method(ruby_name) { |*args| callable.call(*args) }
      end
      wrapper.new
    end
  end
end
