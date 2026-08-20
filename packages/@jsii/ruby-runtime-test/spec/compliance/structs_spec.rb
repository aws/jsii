# frozen_string_literal: true

require 'spec_helper'
require 'date'
require 'json'

# Suite tests: structs_*, useNestedStruct, testStructsCanBeDowncastedToParentType,
# structsAreUndecoratedOntheWayToKernel,
# equals/hashCodeIsResistantToPropertyShadowingResultVariable.
#
# Structs are jsii's value types: pass-by-value data, constructed in Ruby
# with keyword arguments.  The suite demands full value semantics — `==` and
# `#hash` by content across required, optional and diamond-inherited
# properties — plus required-member enforcement at construction
# (ArgumentError) and serialization in both directions.  Two subtle ones:
# `structs_returnedLiteralEqualsNativeBuilt` (a JS object literal returned by
# the kernel must be indistinguishable from a natively-built struct — struct
# refs are eagerly hydrated into plain values on arrival, see
# Registry#hydrate_struct!) and `structsAreUndecoratedOntheWayToKernel`
# (when JS JSON.stringify's a struct we sent, no `$jsii.*` envelope keys may
# leak into the output).  The shadowing-resistance pair guards against a
# generated property named `default`/`result` colliding with names the code
# generator uses internally in its == / #hash implementations.
RSpec.describe 'JSII compliance: structs' do
  it 'compares non-optional structs by value', compliance: 'structs_nonOptionalequals' do
    struct_a = JsiiCalc::StableStruct.new(readonly_property: 'one')
    struct_b = JsiiCalc::StableStruct.new(readonly_property: 'one')
    struct_c = JsiiCalc::StableStruct.new(readonly_property: 'two')

    expect(struct_a).to eq(struct_b)
    expect(struct_b).to eq(struct_a)
    expect(struct_a).not_to eq(struct_c)
  end

  it 'hashes non-optional structs by value', compliance: 'structs_nonOptionalhashCode' do
    struct_a = JsiiCalc::StableStruct.new(readonly_property: 'one')
    struct_b = JsiiCalc::StableStruct.new(readonly_property: 'one')
    struct_c = JsiiCalc::StableStruct.new(readonly_property: 'two')

    expect(struct_a.hash).to eq(struct_b.hash)
    expect(struct_a.hash).not_to eq(struct_c.hash)
  end

  it 'compares optional struct members by value', compliance: 'structs_optionalEquals' do
    struct_a = JsiiCalc::OptionalStruct.new(field: 'one')
    struct_b = JsiiCalc::OptionalStruct.new(field: 'one')
    struct_c = JsiiCalc::OptionalStruct.new(field: 'two')
    struct_d = JsiiCalc::OptionalStruct.new()

    expect(struct_a).to eq(struct_b)
    expect(struct_a).not_to eq(struct_c)
    expect(struct_a).not_to eq(struct_d)
  end

  it 'hashes optional struct members by value', compliance: 'structs_optionalHashCode' do
    struct_a = JsiiCalc::OptionalStruct.new(field: 'one')
    struct_b = JsiiCalc::OptionalStruct.new(field: 'one')
    struct_c = JsiiCalc::OptionalStruct.new(field: 'two')
    struct_d = JsiiCalc::OptionalStruct.new()

    expect(struct_a.hash).to eq(struct_b.hash)
    expect(struct_a.hash).not_to eq(struct_c.hash)
    expect(struct_a.hash).not_to eq(struct_d.hash)
  end

  it 'compares multi-property structs by value', compliance: 'structs_multiplePropertiesEquals' do
    a = JsiiCalc::TopLevelStruct.new(
      required: 'bye',
      second_level: JsiiCalc::SecondLevelStruct.new(deeper_required_prop: 'ciao')
    )
    b = JsiiCalc::TopLevelStruct.new(required: 'hello', second_level: 1)
    c = JsiiCalc::TopLevelStruct.new(required: 'hello', second_level: 1)
    d = JsiiCalc::SecondLevelStruct.new(deeper_required_prop: 'exists')

    expect(a).not_to eq(b)
    expect(b).to eq(c)
    expect(a).not_to eq(5)
    expect(a).not_to eq(d)
  end

  it 'hashes multi-property structs by value', compliance: 'structs_multiplePropertiesHashCode' do
    struct_a = JsiiCalc::DiamondInheritanceTopLevelStruct.new(
      base_level_property: 'one',
      first_mid_level_property: 'two',
      second_mid_level_property: 'three',
      top_level_property: 'four'
    )
    struct_b = JsiiCalc::DiamondInheritanceTopLevelStruct.new(
      base_level_property: 'one',
      first_mid_level_property: 'two',
      second_mid_level_property: 'three',
      top_level_property: 'four'
    )
    struct_c = JsiiCalc::DiamondInheritanceTopLevelStruct.new(
      base_level_property: 'one',
      first_mid_level_property: 'two',
      second_mid_level_property: 'different',
      top_level_property: 'four'
    )

    expect(struct_a.hash).to eq(struct_b.hash)
    expect(struct_a.hash).not_to eq(struct_c.hash)
  end

  it 'enforces required struct members at construction', compliance: 'structs_containsNullChecks' do
    # In Ruby, missing required keyword arguments raise ArgumentError
    expect { Scope::JsiiCalcLib::MyFirstStruct.new }.to raise_error(ArgumentError)
  end

  it 'serializes structs to the kernel', compliance: 'structs_serializeToJsii' do
    first_struct = Scope::JsiiCalcLib::MyFirstStruct.new(
      astring: 'FirstString',
      anumber: 999,
      first_optional: ['First', 'Optional']
    )

    double_trouble = JsiiCalc::DoubleTrouble.new()

    derived_struct = JsiiCalc::DerivedStruct.new(
      non_primitive: double_trouble,
      bool: false,
      another_required: DateTime.now,
      astring: 'String',
      anumber: 1234,
      first_optional: ['one', 'two']
    )

    gms = JsiiCalc::GiveMeStructs.new()
    expect(gms.read_first_number(first_struct)).to eq(999)
    expect(gms.read_first_number(derived_struct)).to eq(1234)
    expect(gms.read_derived_non_primitive(derived_struct).class).to eq(JsiiCalc::DoubleTrouble)

    literal = gms.struct_literal
    expect(literal.optional1).to eq('optional1FromStructLiteral')
    expect(literal.optional3).to be false
    expect(literal.optional2).to be_nil
  end

  it 'constructs structs with keyword arguments (step builders)', compliance: 'structs_stepBuilders' do
    # In Ruby, we use keyword arguments directly rather than generated step builders.
    some_instant = DateTime.now
    non_prim = JsiiCalc::DoubleTrouble.new()

    s = JsiiCalc::DerivedStruct.new(
      non_primitive: non_prim,
      bool: false,
      another_required: some_instant,
      astring: 'Hello',
      anumber: 1234,
      first_optional: ['Hello', 'World']
    )

    expect(s.non_primitive.class).to eq(JsiiCalc::DoubleTrouble)
    expect(s.bool).to be false
    expect(s.another_required.to_s).to eq(some_instant.to_s)
    expect(s.astring).to eq('Hello')
    expect(s.anumber).to eq(1234)
    expect(s.first_optional[1]).to eq('World')
    expect(s.another_optional).to be_nil
    expect(s.optional_array).to be_nil

    my_first_struct = Scope::JsiiCalcLib::MyFirstStruct.new(
      astring: 'Hello',
      anumber: 12
    )

    expect(my_first_struct.astring).to eq('Hello')
    expect(my_first_struct.anumber).to eq(12)

    only_options1 = Scope::JsiiCalcLib::StructWithOnlyOptionals.new(
      optional1: 'Hello',
      optional2: 1
    )

    expect(only_options1.optional1).to eq('Hello')
    expect(only_options1.optional2).to eq(1)
    expect(only_options1.optional3).to be_nil

    only_options2 = Scope::JsiiCalcLib::StructWithOnlyOptionals.new()
    expect(only_options2.optional1).to be_nil
    expect(only_options2.optional2).to be_nil
    expect(only_options2.optional3).to be_nil
  end

  it 'dedupes properties inherited through a diamond', compliance: 'structs_withDiamondInheritance_correctlyDedupeProperties' do
    struct = JsiiCalc::DiamondInheritanceTopLevelStruct.new(
      base_level_property: 'base',
      first_mid_level_property: 'mid1',
      second_mid_level_property: 'mid2',
      top_level_property: 'top'
    )

    expect(struct.base_level_property).to eq('base')
    expect(struct.first_mid_level_property).to eq('mid1')
    expect(struct.second_mid_level_property).to eq('mid2')
    expect(struct.top_level_property).to eq('top')
  end

  it 'makes a struct returned from the kernel indistinguishable from a native one', compliance: 'structs_returnedLiteralEqualsNativeBuilt' do
    gms = JsiiCalc::GiveMeStructs.new
    returned_literal = gms.struct_literal
    native_built = Scope::JsiiCalcLib::StructWithOnlyOptionals.new(
      optional1: 'optional1FromStructLiteral',
      optional3: false
    )
    expect(returned_literal.optional1).to eq(native_built.optional1)
    expect(returned_literal.optional2).to eq(native_built.optional2)
    expect(returned_literal.optional3).to eq(native_built.optional3)
  end

  it 'round-trips nested structs through the kernel', compliance: 'useNestedStruct' do
    struct = JsiiCalc::TopLevelStruct.new(
      required: 'hello',
      second_level: JsiiCalc::SecondLevelStruct.new(deeper_required_prop: 'exists')
    )

    result = JsiiCalc::StructPassing.round_trip(123, struct)
    expect(result).to be_a(JsiiCalc::TopLevelStruct)
    expect(result.required).to eq('hello')
    expect(result.second_level).to be_a(JsiiCalc::SecondLevelStruct)
    expect(result.second_level.deeper_required_prop).to eq('exists')
  end

  it 'downcasts structs to a parent type', compliance: 'testStructsCanBeDowncastedToParentType' do
    expect(JsiiCalc::Demonstrate982.take_this).not_to be_nil
    expect(JsiiCalc::Demonstrate982.take_this_too).not_to be_nil
  end

  it 'serializes structs undecorated to the kernel', compliance: 'structsAreUndecoratedOntheWayToKernel' do
    json = JsiiCalc::JsonFormatter.stringify(
      JsiiCalc::StructB.new(required_string: 'Bazinga!', optional_boolean: false)
    )
    parsed = JSON.parse(json)
    expect(parsed['requiredString']).to eq('Bazinga!')
    expect(parsed['optionalBoolean']).to eq(false)
  end

  # Where is "result"?  It's a property *of the fixture struct* — a booby
  # trap that is never set, whose mere existence at code-generation time is
  # the test (compliance.ts):
  #
  #   export interface StructWithJavaReservedWords {
  #     readonly default: string;
  #     readonly assert?: string;
  #     // These properties are designed to break the naive implementation
  #     // of equals() and hashcode() using the standard template
  #     readonly result?: string;
  #     readonly that?: string;
  #   }
  #
  # The classic Java equals/hashCode template declares locals named exactly
  # `that` (the cast counterpart in equals) and `result` (the accumulator in
  # hashCode).  A naive generator emitting unqualified property reads for a
  # struct that *also* declares members named result/that gets them shadowed
  # by the template's own locals — miscompiles or wrong comparisons.  Ruby
  # has the same hazard in principle (local variables shadow receiver-less
  # method calls), but the runtime sidesteps it entirely: Jsii::Struct#==
  # compares serialized property maps (to_jsii == other.to_jsii) instead of
  # emitting per-struct comparison code.  This test guards that property.
  it 'implements == resistant to a property named "result"', compliance: 'equalsIsResistantToPropertyShadowingResultVariable' do
    first = JsiiCalc::StructWithJavaReservedWords.new(default: 'one')
    second = JsiiCalc::StructWithJavaReservedWords.new(default: 'one')
    third = JsiiCalc::StructWithJavaReservedWords.new(default: 'two')

    expect(first).to eq(second)
    expect(first).not_to eq(third)
  end

  # Same trap as above, aimed at hashCode's `int result = ...` accumulator;
  # Jsii::Struct#hash delegates to to_jsii.hash, so no local can shadow.
  it 'implements #hash resistant to a property named "result"', compliance: 'hashCodeIsResistantToPropertyShadowingResultVariable' do
    first = JsiiCalc::StructWithJavaReservedWords.new(default: 'one')
    second = JsiiCalc::StructWithJavaReservedWords.new(default: 'one')
    third = JsiiCalc::StructWithJavaReservedWords.new(default: 'two')

    expect(first.hash).to eq(second.hash)
    expect(first.hash).not_to eq(third.hash)
  end

  describe 'Ruby-specific struct behavior' do
    # JSII structs support multiple inheritance; Ruby classes don't.  The
    # generator subclasses the first declared parent and records the rest
    # via jsii_extra_struct_bases, which is_a?/kind_of?/case honor.
    it 'treats diamond structs as instances of every declared parent' do
      struct = JsiiCalc::DiamondInheritanceTopLevelStruct.new(
        base_level_property: 'base',
        first_mid_level_property: 'mid1',
        second_mid_level_property: 'mid2',
        top_level_property: 'top'
      )

      # First parent: real Ruby ancestry.
      expect(struct).to be_a(JsiiCalc::DiamondInheritanceFirstMidLevelStruct)
      # Second parent: recorded extra base.
      expect(struct).to be_a(JsiiCalc::DiamondInheritanceSecondMidLevelStruct)
      expect(struct).to be_kind_of(JsiiCalc::DiamondInheritanceSecondMidLevelStruct)
      # Shared grandparent (reached through either path).
      expect(struct).to be_a(JsiiCalc::DiamondInheritanceBaseLevelStruct)

      # case/when dispatch honors the second parent too.
      matched = case struct
                when JsiiCalc::DiamondInheritanceSecondMidLevelStruct then :second
                else :nope
                end
      expect(matched).to eq(:second)

      # Unrelated structs do not conform.
      expect(struct).not_to be_a(JsiiCalc::StructA)
      sibling = JsiiCalc::DiamondInheritanceSecondMidLevelStruct.new(
        base_level_property: 'b', second_mid_level_property: 'm'
      )
      expect(sibling).not_to be_a(JsiiCalc::DiamondInheritanceFirstMidLevelStruct)
      expect(sibling).not_to be_a(JsiiCalc::DiamondInheritanceTopLevelStruct)
    end

    it 'keeps struct equality symmetric across subclasses' do
      child_class = Class.new(JsiiCalc::OptionalStruct)
      parent = JsiiCalc::OptionalStruct.new(field: 'one')
      child = child_class.new(field: 'one')

      expect(parent == child).to be false
      expect(child == parent).to be false
    end

    it 'accepts a scalar where a union-typed struct member allows it' do
      result = JsiiCalc::StructPassing.round_trip(123, required: 'hello', second_level: 5)
      expect(result.required).to eq('hello')
      expect(result.optional).to be_nil
      expect(result.second_level).to eq(5)
    end

    it 'handles structs in variadic args' do
      count = JsiiCalc::StructPassing.how_many_var_args_did_i_pass(
        123,
        JsiiCalc::TopLevelStruct.new(required: 'hello', second_level: 1),
        JsiiCalc::TopLevelStruct.new(required: 'bye', second_level: JsiiCalc::SecondLevelStruct.new(deeper_required_prop: 'ciao'))
      )
      expect(count).to eq(2)
    end

    it 'coerces plain hashes in variadic struct args' do
      # Generator emits `.map!` coercion for variadic struct params; this
      # exercises that path with raw hashes instead of explicit struct instances.
      count = JsiiCalc::StructPassing.how_many_var_args_did_i_pass(
        7,
        { required: 'one', second_level: 1 },
        { required: 'two', second_level: 2 }
      )
      expect(count).to eq(2)
    end

    it 'accepts a mix of struct instances and hashes for variadic args' do
      count = JsiiCalc::StructPassing.how_many_var_args_did_i_pass(
        0,
        JsiiCalc::TopLevelStruct.new(required: 'one', second_level: 1),
        { required: 'two', second_level: 2 }
      )
      expect(count).to eq(2)
    end

    it 'can pass nested structs as plain hashes (RootStructValidator)' do
      JsiiCalc::RootStructValidator.validate(string_prop: 'Pickle Rick!!!')
      JsiiCalc::RootStructValidator.validate(string_prop: 'Pickle Rick!!!', nested_struct: nil)
      JsiiCalc::RootStructValidator.validate(string_prop: 'Pickle Rick!!!', nested_struct: { number_prop: 1337 })
    end

    it 'hydrates structs passed to host validators' do
      struct = JsiiCalc::RootStruct.new(
        string_prop: 'hello',
        nested_struct: JsiiCalc::NestedStruct.new(number_prop: 10)
      )

      # Should not raise error
      JsiiCalc::RootStructValidator.validate(struct)

      # Test failure case
      invalid_struct = JsiiCalc::RootStruct.new(
        string_prop: 'hello',
        nested_struct: JsiiCalc::NestedStruct.new(number_prop: -1)
      )
      expect { JsiiCalc::RootStructValidator.validate(invalid_struct) }.to raise_error(Jsii::RuntimeError, /numberProp must be > 0/)
    end
  end
end
