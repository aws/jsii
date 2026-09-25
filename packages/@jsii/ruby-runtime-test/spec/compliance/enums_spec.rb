# frozen_string_literal: true

require 'spec_helper'

# Suite tests: getAndSetEnumValues, canLoadEnumValues, useEnumFromScopedModule.
#
# Enum members travel as `$jsii.enum` wire envelopes carrying the member's
# fully-qualified name (e.g. "jsii-calc.StringEnum/A").  Covered here:
# round-tripping members through properties, receiving arbitrary members
# from the kernel (including integer-backed enums), and enums defined in a
# *different* assembly — which exercises cross-assembly fqn resolution
# ("@scope/jsii-calc-lib.EnumFromScopedModule/VALUE1").
RSpec.describe 'JSII compliance: enums' do
  it 'gets and sets enum values', compliance: 'getAndSetEnumValues' do
    calc = JsiiCalc::Calculator.new
    calc.add(9)
    calc.pow(3)

    expect(calc.string_style).to eq(JsiiCalc::Composition::CompositeOperation::CompositionStringStyle::NORMAL)

    calc.string_style = JsiiCalc::Composition::CompositeOperation::CompositionStringStyle::DECORATED
    expect(calc.string_style).to eq(JsiiCalc::Composition::CompositeOperation::CompositionStringStyle::DECORATED)
    expect(calc.to_string()).to eq('<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>')
  end

  it 'loads string-like and integer-like enum values from the kernel', compliance: 'canLoadEnumValues' do
    expect(JsiiCalc::EnumDispenser.random_string_like_enum()).not_to be_nil
    expect(JsiiCalc::EnumDispenser.random_integer_like_enum()).not_to be_nil
  end

  it 'sets and reads an enum from a scoped third-party package', compliance: 'useEnumFromScopedModule' do
    obj = JsiiCalc::ReferenceEnumFromScopedPackage.new
    expect(obj.foo).to eq(Scope::JsiiCalcLib::EnumFromScopedModule::VALUE2)
    obj.foo = Scope::JsiiCalcLib::EnumFromScopedModule::VALUE1
    expect(obj.load_foo).to eq(Scope::JsiiCalcLib::EnumFromScopedModule::VALUE1)
    obj.save_foo(Scope::JsiiCalcLib::EnumFromScopedModule::VALUE2)
    expect(obj.foo).to eq(Scope::JsiiCalcLib::EnumFromScopedModule::VALUE2)
  end
end
