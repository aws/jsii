require 'spec_helper'


module Mock
  class BaseStruct < Jsii::Struct
    def self.jsii_fqn
      'mock.BaseStruct'
    end
  end

  class DerivedStruct < BaseStruct
    def self.jsii_fqn
      'mock.DerivedStruct'
    end
  end

  class UnrelatedStruct < Jsii::Struct
    def self.jsii_fqn
      'mock.UnrelatedStruct'
    end
  end
end

RSpec.describe Jsii::Type do
  describe '.check_fqn' do
    before do
      # Mock the registry to return our mock structs
      allow(Jsii::Type).to receive(:resolve_fqn_to_ruby_class) do |fqn|
        case fqn
        when 'mock.BaseStruct' then Mock::BaseStruct
        when 'mock.DerivedStruct' then Mock::DerivedStruct
        when 'mock.UnrelatedStruct' then Mock::UnrelatedStruct
        else nil
        end
      end
    end

    it 'allows Hash for any struct' do
      expect {
        Jsii::Type.send(:check_fqn, {}, 'mock.BaseStruct', 'arg')
      }.not_to raise_error
    end

    it 'allows direct instances of the struct' do
      expect {
        Jsii::Type.send(:check_fqn, Mock::BaseStruct.new, 'mock.BaseStruct', 'arg')
      }.not_to raise_error
    end

    it 'allows subclass instances (normal inheritance)' do
      expect {
        Jsii::Type.send(:check_fqn, Mock::DerivedStruct.new, 'mock.BaseStruct', 'arg')
      }.not_to raise_error
    end

    it 'allows unrelated structs (duck typing for multiple inheritance)' do
      expect {
        Jsii::Type.send(:check_fqn, Mock::UnrelatedStruct.new, 'mock.BaseStruct', 'arg')
      }.not_to raise_error
    end
  end
end
