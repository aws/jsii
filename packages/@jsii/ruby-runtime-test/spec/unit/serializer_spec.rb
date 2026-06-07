# frozen_string_literal: true

require 'spec_helper'
require 'date'
require 'time'

RSpec.describe Jsii::Serializer do
  describe '.dump' do
    it 'passes scalars through unchanged' do
      [nil, true, false, 0, 1.5, 'hello', :sym].each do |scalar|
        expect(described_class.dump(scalar)).to eq(scalar)
      end
    end

    it 'recursively dumps arrays' do
      input = [1, 'two', [3, 4], { 'k' => 'v' }]
      expect(described_class.dump(input)).to eq([1, 'two', [3, 4], { 'k' => 'v' }])
    end

    it 'recursively dumps hash values' do
      input = { 'outer' => { 'inner' => 1 }, 'list' => [1, 2] }
      expect(described_class.dump(input)).to eq(input)
    end

    it 'wraps Date as a $jsii.date envelope' do
      result = described_class.dump(Date.new(2024, 6, 15))
      expect(result).to include('$jsii.date')
      expect(result['$jsii.date']).to start_with('2024-06-15T')
    end

    it 'wraps Time as a UTC $jsii.date envelope' do
      time = Time.utc(2024, 6, 15, 12, 30, 45)
      result = described_class.dump(time)
      expect(result).to eq({ '$jsii.date' => '2024-06-15T12:30:45.000Z' })
    end

    it 'wraps DateTime as a $jsii.date envelope' do
      dt = DateTime.new(2024, 6, 15, 12, 30, 45, '+00:00')
      result = described_class.dump(dt)
      expect(result).to eq({ '$jsii.date' => '2024-06-15T12:30:45.000+00:00' })
    end

    it 'serializes Jsii::Enum to a $jsii.enum envelope' do
      enum = Jsii::Enum.new('jsii-calc.Color', 'RED')
      expect(described_class.dump(enum)).to eq({ '$jsii.enum' => 'jsii-calc.Color/RED' })
    end

    it 'passes plain Ruby objects through unchanged (does NOT walk host objects)' do
      # The previous monkey-patched Object#jsii_serialize would have walked any
      # object with an @jsii_ref ivar.  Now untyped objects pass straight
      # through, which is the correct behavior — host apps are not surprised.
      host_object = Object.new
      host_object.instance_variable_set(:@jsii_ref, 'this is a host detail, not jsii state')

      expect(described_class.dump(host_object)).to be(host_object)
    end
  end

  describe '.load' do
    it 'passes scalars through unchanged' do
      [nil, true, false, 0, 1.5, 'hello'].each do |scalar|
        expect(described_class.load(scalar)).to eq(scalar)
      end
    end

    it 'decodes a $jsii.date envelope into a DateTime' do
      result = described_class.load({ '$jsii.date' => '2024-06-15T12:30:45.000Z' })
      expect(result).to be_a(DateTime)
      expect(result.year).to eq(2024)
      expect(result.month).to eq(6)
      expect(result.day).to eq(15)
    end

    it 'decodes a $jsii.enum envelope into a Jsii::Enum' do
      result = described_class.load({ '$jsii.enum' => 'jsii-calc.Color/RED' })
      expect(result).to be_a(Jsii::Enum)
      expect(result.fqn).to eq('jsii-calc.Color')
      expect(result.value).to eq('RED')
    end

    it 'recursively loads array elements' do
      input = [{ '$jsii.enum' => 'foo/A' }, 'plain']
      result = described_class.load(input)
      expect(result[0]).to be_a(Jsii::Enum)
      expect(result[1]).to eq('plain')
    end

    it 'recursively loads hash values that are not envelopes' do
      input = { 'list' => [1, { '$jsii.enum' => 'foo/A' }] }
      result = described_class.load(input)
      expect(result['list'][1]).to be_a(Jsii::Enum)
    end

    it 'unwraps $jsii.map envelopes by loading the inner hash' do
      result = described_class.load({ '$jsii.map' => { 'a' => 1, 'b' => 2 } })
      expect(result).to eq({ 'a' => 1, 'b' => 2 })
    end
  end

  describe 'round-trip' do
    it 'dump/load is the identity for plain JSON-like values' do
      value = { 'a' => 1, 'b' => [true, false, nil, 2.5], 'c' => 'hello' }
      expect(described_class.load(described_class.dump(value))).to eq(value)
    end

    it 'round-trips an enum' do
      enum = Jsii::Enum.new('jsii-calc.Color', 'RED')
      result = described_class.load(described_class.dump(enum))
      expect(result).to eq(enum)
    end
  end
end
