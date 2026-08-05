# frozen_string_literal: true

require 'spec_helper'

# Suite tests: undefinedAndNull, nullShouldBeTreatedAsUndefined,
# testNullIsAValidOptionalList, testNullIsAValidOptionalMap,
# eraseUnsetDataValues.
#
# The nil/undefined boundary.  JavaScript distinguishes `null` from
# `undefined`; Ruby only has `nil`, so the runtime must map consistently:
# unset optionals read as nil, nil written to an optional must arrive as
# `undefined` (in arguments, struct members and array elements alike), and a
# host API legitimately returning `undefined` collections must surface nil.
# `eraseUnsetDataValues` is the subtle one: unset struct keys must be
# *absent* from the wire payload, not present-with-null — JS `'key' in obj`
# distinguishes the two, and host code relies on that.
RSpec.describe 'JSII compliance: null / undefined semantics' do
  it 'reads unset optional values as nil and accepts nil assignment', compliance: 'undefinedAndNull' do
    calc = JsiiCalc::Calculator.new
    expect(calc.max_value).to be_nil
    calc.max_value = nil
  end

  it 'treats nil as undefined for optional args, struct members and properties', compliance: 'nullShouldBeTreatedAsUndefined' do
    obj = JsiiCalc::NullShouldBeTreatedAsUndefined.new('hello', nil)
    obj.give_me_undefined(nil)
    obj.give_me_undefined_inside_an_object(
      this_should_be_undefined: nil,
      array_with_three_elements_and_undefined_as_second_argument: ['hello', nil, 'boom']
    )
    obj.change_me_to_undefined = nil
    obj.verify_property_is_undefined
  end

  it 'accepts nil as a valid optional list', compliance: 'testNullIsAValidOptionalList' do
    expect(JsiiCalc::DisappointingCollectionSource.MAYBE_LIST).to be_nil
  end

  it 'accepts nil as a valid optional map', compliance: 'testNullIsAValidOptionalMap' do
    expect(JsiiCalc::DisappointingCollectionSource.MAYBE_MAP).to be_nil
  end

  it 'erases unset optional data values on the way to the kernel', compliance: 'eraseUnsetDataValues' do
    opts = JsiiCalc::EraseUndefinedHashValuesOptions.new(option1: 'option1')
    expect(JsiiCalc::EraseUndefinedHashValues.does_key_exist(opts, 'option1')).to be true
    expect(JsiiCalc::EraseUndefinedHashValues.does_key_exist(opts, 'option2')).to be false
  end
end
