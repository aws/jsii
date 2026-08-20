# frozen_string_literal: true

# Shared native fixture classes used across the compliance specs.
#
# These are defined in a `before(:suite)` hook (rather than at the top level)
# because the JsiiCalc constants only exist once spec_helper's assembly-loading
# `before(:suite)` hook has run.  RSpec runs suite hooks in registration order,
# and spec_helper requires this file after registering its own hook.
RSpec.configure do |config|
  config.before(:suite) do
    # Subclass of AsyncVirtualMethods whose override delegates to another
    # method on the same (base) class.
    Object.const_set(:OverrideAsyncMethodsByBaseClass, Class.new(JsiiCalc::AsyncVirtualMethods) do
      def override_me(mult)
        foo * 2
      end

      def foo
        2222
      end
    end)

    # Async override that calls super.
    Object.const_set(:OverrideCallsSuper, Class.new(JsiiCalc::AsyncVirtualMethods) do
      def override_me(mult)
        super_ret = super(mult)
        super_ret * 10 + 1
      end
    end)

    # Two simultaneous async overrides.
    Object.const_set(:TwoOverrides, Class.new(JsiiCalc::AsyncVirtualMethods) do
      def override_me(mult)
        666
      end

      def override_me_too
        10
      end
    end)

    # Native subclasses of host classes, used to verify that object identity
    # is preserved when native objects round-trip through the kernel.
    Object.const_set(:AddTen, Class.new(JsiiCalc::Add) do
      def initialize(value)
        super(Scope::JsiiCalcLib::Number.new(value), Scope::JsiiCalcLib::Number.new(10))
      end
    end)

    Object.const_set(:MulTen, Class.new(JsiiCalc::Multiply) do
      def initialize(value)
        super(Scope::JsiiCalcLib::Number.new(value), Scope::JsiiCalcLib::Number.new(10))
      end
    end)

    # A pure-native (no host base class) implementation of
    # IFriendlyRandomGenerator.
    Object.const_set(:PureNativeFriendlyRandom, Class.new do
      include JsiiCalc::IFriendlyRandomGenerator

      def initialize
        @next_number = 1000
      end

      def _next
        n = @next_number
        @next_number += 1000
        n
      end

      def hello
        'I am a native!'
      end
    end)

    # A native subclass of a host class that also implements host interfaces.
    Object.const_set(:SubclassNativeFriendlyRandom, Class.new(Scope::JsiiCalcLib::Number) do
      include Scope::JsiiCalcLib::IFriendly
      include JsiiCalc::IRandomNumberGenerator

      def initialize
        super(908)
        @next_number = 100
      end

      def hello
        'SubclassNativeFriendlyRandom'
      end

      def _next
        n = @next_number
        @next_number += 100
        n
      end
    end)

    # Configurable sync-override harness for SyncVirtualMethods.
    Object.const_set(:SyncOverrides, Class.new(JsiiCalc::SyncVirtualMethods) do
      attr_accessor :multiplier, :return_super, :call_async, :another_the_property

      def initialize
        super
        @multiplier = 1
        @return_super = false
        @call_async = false
        @another_the_property = nil
      end

      def virtual_method(n)
        return super(n) if @return_super

        if @call_async
          obj = JsiiCalc::AsyncVirtualMethods.new
          return obj.call_me
        end

        5 * n * @multiplier
      end

      def the_property
        'I am an override!'
      end

      def the_property=(value)
        @another_the_property = value
      end
    end)
  end
end
