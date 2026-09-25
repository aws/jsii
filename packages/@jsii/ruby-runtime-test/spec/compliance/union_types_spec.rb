# frozen_string_literal: true

require 'spec_helper'

# Suite tests: unionTypes, unionProperties, unionPropertiesWithBuilder,
# correctlyDeserializesStructUnions, canObtainReferenceWithOverloadedSetter,
# canObtainStructReferenceWithOverloadedSetter.
#
# `A | B`-typed slots.  Values set through a union-typed property must come
# back as their *concrete* type, not some boxed wrapper.
# `correctlyDeserializesStructUnions` is the interesting one: given a
# `StructA | StructB` parameter, the serialized form must let the JS side
# tell which struct it received (the set of keys present decides).  The
# ConfusingToJackson tests are regressions for types whose setters accept
# unions — historically these broke code generation in other languages.
RSpec.describe 'JSII compliance: union types' do
  it 'sets and reads union-typed properties with the concrete type', compliance: 'unionTypes' do
    types = JsiiCalc::AllTypes.new

    # single valued property
    types.union_property = 1234
    expect(types.union_property).to eq(1234)

    types.union_property = 'Hello'
    expect(types.union_property).to eq('Hello')

    types.union_property = JsiiCalc::Multiply.new(Scope::JsiiCalcLib::Number.new(2), Scope::JsiiCalcLib::Number.new(12))
    expect(types.union_property.value).to eq(24)

    # array
    types.union_array_property = [123, Scope::JsiiCalcLib::Number.new(33)]
    expect(types.union_array_property[1].value).to eq(33)
  end

  it 'round-trips union-typed values through the calculator', compliance: 'unionProperties' do
    calc = JsiiCalc::Calculator.new
    calc.union_property = JsiiCalc::Multiply.new(Scope::JsiiCalcLib::Number.new(9), Scope::JsiiCalcLib::Number.new(3))
    expect(calc.union_property).to be_a(JsiiCalc::Multiply)
    expect(calc.read_union_value).to eq(9 * 3)

    calc.union_property = JsiiCalc::Power.new(Scope::JsiiCalcLib::Number.new(10), Scope::JsiiCalcLib::Number.new(3))
    expect(calc.union_property).to be_a(JsiiCalc::Power)
    expect(calc.read_union_value).to eq(10**3)
  end

  it 'constructs objects with union-typed struct properties', compliance: 'unionPropertiesWithBuilder' do
    obj1 = JsiiCalc::UnionProperties.new(bar: 12, foo: 'Hello')
    expect(obj1.bar).to eq(12)
    expect(obj1.foo).to eq('Hello')

    obj2 = JsiiCalc::UnionProperties.new(bar: 'BarIsString')
    expect(obj2.bar).to eq('BarIsString')
    expect(obj2.foo).to be_nil

    all_types = JsiiCalc::AllTypes.new
    obj3 = JsiiCalc::UnionProperties.new(bar: all_types, foo: 999)
    expect(obj3.bar).to eq(all_types)
    expect(obj3.foo).to eq(999)
  end

  it 'disambiguates structs in a union by their properties', compliance: 'correctlyDeserializesStructUnions' do
    a0 = JsiiCalc::StructA.new(required_string: 'Present!', optional_string: 'Bazinga!')
    a1 = JsiiCalc::StructA.new(required_string: 'Present!', optional_number: 1337)
    b0 = JsiiCalc::StructB.new(required_string: 'Present!', optional_boolean: true)
    b1 = JsiiCalc::StructB.new(required_string: 'Present!', optional_struct_a: a1)

    expect(JsiiCalc::StructUnionConsumer.is_struct_a(a0)).to be true
    expect(JsiiCalc::StructUnionConsumer.is_struct_a(a1)).to be true
    expect(JsiiCalc::StructUnionConsumer.is_struct_a(b0)).to be false
    expect(JsiiCalc::StructUnionConsumer.is_struct_a(b1)).to be false

    expect(JsiiCalc::StructUnionConsumer.is_struct_b(a0)).to be false
    expect(JsiiCalc::StructUnionConsumer.is_struct_b(a1)).to be false
    expect(JsiiCalc::StructUnionConsumer.is_struct_b(b0)).to be true
    expect(JsiiCalc::StructUnionConsumer.is_struct_b(b1)).to be true
  end

  it 'returns a class with an overloaded (union-typed) setter from the kernel', compliance: 'canObtainReferenceWithOverloadedSetter' do
    expect(JsiiCalc::ConfusingToJackson.make_instance).not_to be_nil
  end

  it 'returns a struct with an overloaded (union-typed) setter from the kernel', compliance: 'canObtainStructReferenceWithOverloadedSetter' do
    expect(JsiiCalc::ConfusingToJackson.make_struct_instance).not_to be_nil
  end
end
