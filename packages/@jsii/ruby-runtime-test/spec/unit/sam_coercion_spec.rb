# frozen_string_literal: true

require 'spec_helper'

# Jsii::Utils.coerce_callable — Proc/Hash coercion into single-abstract-method
# (SAM) interface implementations.  This is Ruby-side ergonomics in front of
# the wire contract, exactly like hash-to-struct coercion: after the wrapper
# is built, everything downstream is the ordinary (compliance-tested) native
# interface implementation path.
RSpec.describe 'SAM callable coercion' do
  let(:sam_interface) do
    Module.new do
      def self.jsii_fqn
        'fake.ISingleMethod'
      end

      def self.jsii_overridable_methods
        { your_turn: { kind: :method, name: 'yourTurn', is_optional: false } }
      end
    end
  end

  let(:two_method_interface) do
    Module.new do
      def self.jsii_fqn
        'fake.ITwoMethods'
      end

      def self.jsii_overridable_methods
        {
          first: { kind: :method, name: 'first', is_optional: false },
          second: { kind: :method, name: 'second', is_optional: false }
        }
      end
    end
  end

  let(:property_interface) do
    Module.new do
      def self.jsii_fqn
        'fake.IProperty'
      end

      def self.jsii_overridable_methods
        { value: { kind: :property, name: 'value', is_optional: false } }
      end
    end
  end

  describe 'bare Proc form' do
    it 'wraps a lambda into an implementing object' do
      seen = nil
      wrapped = Jsii::Utils.coerce_callable(->(bell) { seen = bell; :rang }, sam_interface)

      expect(wrapped).to be_a(sam_interface)
      expect(wrapped.your_turn(:the_bell)).to eq(:rang)
      expect(seen).to eq(:the_bell)
    end

    it 'produces an object the serializer recognises as a native implementation' do
      wrapped = Jsii::Utils.coerce_callable(-> {}, sam_interface)
      expect(Jsii::Serializer.jsii_native_implementation?(wrapped)).to be true
    end

    it 'wraps a zero-arity proc for a zero-arg member' do
      wrapped = Jsii::Utils.coerce_callable(-> { 42 }, sam_interface)
      expect(wrapped.your_turn).to eq(42)
    end
  end

  describe 'single-entry Hash form (the TypeScript object-literal mirror)' do
    it 'wraps { member: proc }' do
      wrapped = Jsii::Utils.coerce_callable({ your_turn: ->(x) { x * 2 } }, sam_interface)
      expect(wrapped).to be_a(sam_interface)
      expect(wrapped.your_turn(21)).to eq(42)
    end

    it 'passes through a hash whose key is not the member name' do
      value = { wrong_key: -> {} }
      expect(Jsii::Utils.coerce_callable(value, sam_interface)).to equal(value)
    end

    it 'passes through a multi-entry hash' do
      value = { your_turn: -> {}, extra: 1 }
      expect(Jsii::Utils.coerce_callable(value, sam_interface)).to equal(value)
    end

    it 'passes through a hash whose value is not a proc' do
      value = { your_turn: 42 }
      expect(Jsii::Utils.coerce_callable(value, sam_interface)).to equal(value)
    end
  end

  describe 'non-SAM interfaces and non-coercible values pass through unchanged' do
    it 'ignores procs aimed at a two-method interface' do
      value = -> {}
      expect(Jsii::Utils.coerce_callable(value, two_method_interface)).to equal(value)
    end

    it 'ignores procs aimed at a single-property interface' do
      value = -> {}
      expect(Jsii::Utils.coerce_callable(value, property_interface)).to equal(value)
    end

    it 'ignores plain values' do
      expect(Jsii::Utils.coerce_callable(42, sam_interface)).to eq(42)
      expect(Jsii::Utils.coerce_callable(nil, sam_interface)).to be_nil
    end

    it 'ignores modules without override metadata' do
      value = -> {}
      expect(Jsii::Utils.coerce_callable(value, Module.new)).to equal(value)
    end
  end

  describe 'end to end through the kernel (jsii-calc)' do
    it 'a coerced lambda rings the bell via a real callback round-trip' do
      ringer = Jsii::Utils.coerce_callable(->(bell) { bell.ring }, JsiiCalc::IBellRinger)

      expect(JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(ringer)).to be true
      expect(JsiiCalc::ConsumerCanRingBell.new.implemented_by_object_literal(ringer)).to be true
    end

    it 'the hash form works identically' do
      ringer = Jsii::Utils.coerce_callable({ your_turn: ->(bell) { bell.ring } }, JsiiCalc::IBellRinger)
      expect(JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(ringer)).to be true
    end
  end

  describe 'generated code applies the coercion automatically' do
    it 'accepts a raw lambda where a SAM interface parameter is expected' do
      expect(
        JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(->(bell) { bell.ring })
      ).to be true
      expect(
        JsiiCalc::ConsumerCanRingBell.new.implemented_by_object_literal(->(bell) { bell.ring })
      ).to be true
    end

    it 'accepts the TypeScript-mirror hash form at the call site' do
      expect(
        JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(
          { your_turn: ->(bell) { bell.ring } }
        )
      ).to be true
    end

    it 'ordinary implementing objects are unaffected' do
      ringer = Class.new do
        include JsiiCalc::IBellRinger
        def your_turn(bell)
          bell.ring
        end
      end.new
      expect(JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(ringer)).to be true
    end

    it 'a non-coercible value still fails ordinary type checking' do
      expect do
        JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(42)
      end.to raise_error(TypeError)
    end
  end
end
