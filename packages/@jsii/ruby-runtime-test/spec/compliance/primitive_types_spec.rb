# frozen_string_literal: true

require 'spec_helper'
require 'date'

# Suite tests: primitiveTypes, dates, iso8601DoesNotDeserializeToDate,
# dynamicTypes.
#
# Value marshalling for scalars.  `primitiveTypes` round-trips
# boolean/string/number/date/json through AllTypes properties.  `dates`
# checks DateTime works in both a strongly-typed slot (date_property) and an
# `any` slot — exercising the `$jsii.date` wire envelope in Jsii::Serializer.
# `iso8601DoesNotDeserializeToDate` is the inverse trap: a *string* that
# happens to look like a date must come back as a string, not get eagerly
# coerced into a DateTime.  `dynamicTypes` pushes every shape (scalars,
# arrays, maps, live objects) through a single `any`-typed property, so the
# serializer has to pick the right wire envelope per value with no type
# information to guide it.
RSpec.describe 'JSII compliance: primitive and dynamic types' do
  it 'sets and reads all primitive types with their respective types', compliance: 'primitiveTypes' do
    types = JsiiCalc::AllTypes.new

    # boolean
    types.boolean_property = true
    expect(types.boolean_property).to be true

    # string
    types.string_property = 'foo'
    expect(types.string_property).to eq('foo')

    # number
    types.number_property = 1234
    expect(types.number_property).to eq(1234)

    # date
    date = DateTime.new(1970, 1, 1, 0, 0, 0.123)
    # JSII usually expects timestamps or ISO strings for dates
    types.date_property = date
    expect(types.date_property).to eq(date)

    # json
    types.json_property = { 'Foo' => { 'bar' => 123 } }
    expect(types.json_property['Foo']).to eq({ 'bar' => 123 })
  end

  it 'handles dates in both strong-typed and any context', compliance: 'dates' do
    types = JsiiCalc::AllTypes.new

    # strong type
    date = DateTime.new(1970, 1, 1, 0, 0, 0.123)
    types.date_property = date
    expect(types.date_property).to eq(date)

    # weak type (any_property)
    date2 = DateTime.new(1970, 1, 1, 0, 0, 0.999)
    types.any_property = date2
    expect(types.any_property).to eq(date2)
  end

  it 'does not auto-deserialize ISO8601 strings as dates', compliance: 'iso8601DoesNotDeserializeToDate' do
    wall_clock_class = Class.new do
      include JsiiCalc::IWallClock
      def initialize(now)
        @now = now
      end

      def iso8601_now
        @now
      end
    end

    entropy_class = Class.new(JsiiCalc::Entropy) do
      def repeat(word)
        word
      end
    end

    now = DateTime.now.new_offset(0).iso8601(3).sub('+00:00', 'Z')
    wall_clock = wall_clock_class.new(now)
    entropy = entropy_class.new(wall_clock)

    expect(entropy.increase).to eq(now)
  end

  it 'handles various types assigned to an any-typed property', compliance: 'dynamicTypes' do
    types = JsiiCalc::AllTypes.new

    # boolean
    types.any_property = false
    expect(types.any_property).to be false

    # string
    types.any_property = 'String'
    expect(types.any_property).to eq('String')

    # number
    types.any_property = 12
    expect(types.any_property).to eq(12)

    # json
    types.any_property = { 'Goo' => ['Hello', { 'World' => 123 }] }
    got = types.any_property['Goo']
    expect(got).not_to be_nil
    expect(got[1]['World']).to eq(123)

    # array
    types.any_property = ['Hello', 'World']
    expect(types.any_property[0]).to eq('Hello')
    expect(types.any_property[1]).to eq('World')

    # array of any
    types.any_array_property = ['Hybrid', Scope::JsiiCalcLib::Number.new(12), 123, false]
    expect(types.any_array_property[2]).to eq(123)
    expect(types.any_array_property[1]).to be_a(Scope::JsiiCalcLib::Number)

    # map
    map = { 'MapKey' => 'MapValue' }
    types.any_property = map
    expect(types.any_property['MapKey']).to eq('MapValue')

    # classes
    mult = JsiiCalc::Multiply.new(Scope::JsiiCalcLib::Number.new(10), Scope::JsiiCalcLib::Number.new(20))
    types.any_property = mult
    expect(types.any_property.jsii_ref).to eq(mult.jsii_ref)
    expect(types.any_property).to be_a(JsiiCalc::Multiply)
    expect(types.any_property.value).to eq(200)
  end

  it 'handles maps assigned to an any-typed map property' do
    types = JsiiCalc::AllTypes.new
    map = { 'MapKey' => 'MapValue', 'Goo' => 19_289_812 }
    types.any_map_property = map
    expect(types.any_map_property['Goo']).to eq(19_289_812)
  end
end
