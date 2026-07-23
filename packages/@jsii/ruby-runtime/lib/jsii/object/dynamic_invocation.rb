# frozen_string_literal: true

module Jsii
  class Object
    # Handles dynamic invocation of methods and properties on JSII objects via method_missing
    module DynamicInvocation
      # Route unknown Ruby method calls to JSII members on the underlying
      # object: setters (`name=`) become `set_property`, no-arg calls try
      # `get_property` then fall back to `call_method`, and any other call
      # is dispatched as `call_method`.
      #
      # @param symbol [Symbol] the method name being invoked on this proxy.
      # @param args   [Array]  arguments passed to the method.
      # @return [Object] the value returned by the kernel for that member.
      # @raise [NoMethodError] if `symbol` cannot be a JSII member name (passes through to `super`).
      # @raise [Jsii::Error] if the kernel rejects the call for reasons other than "missing member".
      def method_missing(symbol, *args)
        return super(symbol, *args) unless valid_jsii_method_name?(symbol)

        camel_name = Jsii::Utils.camelize(symbol)
        fallback = -> { super(symbol, *args) }

        if camel_name.end_with?('=')
          invoke_setter(camel_name.chomp('='), args.first, &fallback)
        elsif args.empty?
          invoke_getter_or_method(camel_name, args, &fallback)
        else
          invoke_method(camel_name, args, &fallback)
        end
      end

      # Reports `true` for any name that could legally be a JSII member, so
      # that Ruby's `respond_to?` / duck-typing checks behave correctly for
      # methods serviced via {#method_missing}.
      #
      # @param symbol         [Symbol] the method name being probed.
      # @param include_private [Boolean] passed through to `super` for non-JSII names.
      # @return [Boolean] `true` if the name is a plausible JSII member, otherwise defers to `super`.
      def respond_to_missing?(symbol, include_private = false)
        return true if valid_jsii_method_name?(symbol)

        super
      end

      private

      # Ruby implicit-conversion sentinels that the interpreter and stdlib
      # probe via duck-typing.  We must let `method_missing` fall through to
      # `super` for these — otherwise we'll try to dispatch them as JSII
      # members and either deadlock the kernel or return surprising values
      # (e.g. `Array(obj)` calls `to_ary`).  Note this list deliberately does
      # NOT include `to_string` / `to_json` / `to_array` — those are common
      # JSII member names that need to dispatch normally.
      RUBY_COERCION_METHODS = %i[
        to_ary to_a to_hash to_h to_str to_proc to_int to_io to_path to_open to_regexp
      ].freeze

      # Does the given symbol look like it could be a JSII member?  Filters
      # out Ruby's implicit-conversion sentinels (`to_ary`/`to_str`/etc.) so
      # duck-typing probes in stdlib don't get dispatched over the wire.
      #
      # @param symbol [Symbol] the candidate method name.
      # @return [Boolean] `true` if the name is a plausible JSII member.
      def valid_jsii_method_name?(symbol)
        return false if RUBY_COERCION_METHODS.include?(symbol)

        # JSII members are alphanumeric + underscores, with an optional trailing '=' for setters
        !!symbol.to_s.match(/^[a-zA-Z_][a-zA-Z0-9_]*=?$/)
      end

      # Forward a setter call to the kernel; on a "missing member" error
      # yield to the supplied fallback (which lets Ruby's normal
      # `method_missing` chain run) instead of re-raising.
      #
      # @param prop_name [String] the camelCase JSII property name.
      # @param value     [Object] the value to assign.
      # @yieldreturn [Object] the fallback's return value when the property is unknown.
      # @return [Object] the kernel's response, or the fallback's return value.
      # @raise [Jsii::Error] for non-"missing member" errors.
      def invoke_setter(prop_name, value)
        jsii_set_property(prop_name, value)
      rescue Jsii::Error => e
        return yield if e.missing_member?

        raise e
      end

      # Forward a method call to the kernel with the same "missing member
      # → fallback" semantics as {#invoke_setter}.
      #
      # @param camel_name [String] the camelCase JSII method name.
      # @param args       [Array]  positional arguments.
      # @yieldreturn [Object] fallback value when the method is unknown.
      # @return [Object] the method's return value (or the fallback's value).
      # @raise [Jsii::Error] for non-"missing member" errors.
      def invoke_method(camel_name, args)
        jsii_call_method(camel_name, args)
      rescue Jsii::Error => e
        return yield if e.missing_member?

        raise e
      end

      # No-arg call: try the JSII property first (since Ruby zero-arg method
      # calls are ambiguous between methods and attribute reads), fall
      # through to {#invoke_method} if the property is unknown.
      #
      # @param camel_name [String] the camelCase JSII member name.
      # @param args       [Array]  always empty for this path; passed through.
      # @yieldreturn [Object] fallback value when neither getter nor method matches.
      # @return [Object] the resolved value (property, method, or fallback).
      # @raise [Jsii::Error] for non-"missing member" errors.
      def invoke_getter_or_method(camel_name, args, &fallback)
        jsii_get_property(camel_name)
      rescue Jsii::Error => e
        raise e unless e.missing_member?

        invoke_method(camel_name, args, &fallback)
      end
    end
  end
end
