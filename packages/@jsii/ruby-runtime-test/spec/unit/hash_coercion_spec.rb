require 'spec_helper'

RSpec.describe 'JSII Compliance' do
  describe 'Hash-to-Struct Coercion' do
    it 'passes plain hashes to constructors expecting structs' do
      # Calculator accepts a CalculatorProps struct - passing a plain Hash
      # should be automatically coerced into a CalculatorProps instance
      calc = JsiiCalc::Calculator.new(maximum_value: 100)
      calc.add(50)
      expect(calc.value).to eq(50)

      # Verify the max_value was actually applied by the coerced struct
      expect(calc.max_value).to eq(100)
    end

    it 'passes plain hashes to static methods expecting structs' do
      # StructPassing.round_trip expects a TopLevelStruct - passing a plain Hash
      result = JsiiCalc::StructPassing.round_trip(
        123,
        required: 'hello_from_hash',
        second_level: JsiiCalc::SecondLevelStruct.new(deeper_required_prop: 'nested_value')
      )

      expect(result).to be_a(JsiiCalc::TopLevelStruct)
      expect(result.required).to eq('hello_from_hash')
      expect(result.second_level).to be_a(JsiiCalc::SecondLevelStruct)
      expect(result.second_level.deeper_required_prop).to eq('nested_value')
    end

    it 'coerces hashes in union-typed struct members with a single struct arm' do
      # second_level is union(number, SecondLevelStruct): exactly one struct
      # arm and no map/any arm, so a Hash is unambiguous and gets coerced.
      # Round-tripping through the kernel proves the wire form is correct
      # (an uncoerced hash would serialize snake_case keys, not camelCase).
      result = JsiiCalc::StructPassing.round_trip(
        7,
        required: 'hello',
        second_level: { deeper_required_prop: 'coerced!' }
      )

      expect(result.second_level).to be_a(JsiiCalc::SecondLevelStruct)
      expect(result.second_level.deeper_required_prop).to eq('coerced!')
    end

    it 'coerces hashes inside arrays and maps of structs (struct members)' do
      props = JsiiCalc::ContainerProps.new(
        array_prop: [{ example: 'one' }, JsiiCalc::DummyObj.new(example: 'two')],
        obj_prop: { 'a' => { example: 'three' } },
        record_prop: { 'b' => { example: 'four' } }
      )

      expect(props.array_prop[0]).to be_a(JsiiCalc::DummyObj)
      expect(props.array_prop[0].example).to eq('one')
      expect(props.array_prop[1].example).to eq('two')
      expect(props.obj_prop['a']).to be_a(JsiiCalc::DummyObj)
      expect(props.obj_prop['a'].example).to eq('three')
      expect(props.record_prop['b'].example).to eq('four')
    end

    it 'coerces hashes inside collection-of-struct method/constructor parameters' do
      obj = JsiiCalc::ClassWithContainerTypes.new(
        [{ example: 'a' }],
        { 'k' => { example: 'b' } },
        { 'j' => { example: 'c' } }
      )

      expect(obj.array.first.example).to eq('a')
      expect(obj.record['k'].example).to eq('b')
      expect(obj.obj['j'].example).to eq('c')
    end

    it 'accepts string-keyed hashes (e.g. parsed JSON) wherever structs are coerced' do
      # The keyword splat needs Symbol keys; coercion symbolizes them so a
      # JSON-shaped hash works instead of raising a bare ArgumentError.
      calc = JsiiCalc::Calculator.new({ 'maximum_value' => 100 })
      expect(calc.max_value).to eq(100)

      result = JsiiCalc::StructPassing.round_trip(
        1,
        { 'required' => 'hi', 'second_level' => { 'deeper_required_prop' => 'deep' } }
      )
      expect(result.second_level.deeper_required_prop).to eq('deep')

      props = JsiiCalc::ContainerProps.new(
        array_prop: [{ 'example' => 'one' }],
        obj_prop: { 'a' => { 'example' => 'two' } },
        record_prop: {}
      )
      expect(props.array_prop[0].example).to eq('one')
      expect(props.obj_prop['a'].example).to eq('two')
    end

    it 'reports unknown struct keys as a clear ArgumentError' do
      expect { JsiiCalc::CalculatorProps.new(bogus_key: 1) }
        .to raise_error(ArgumentError, /unknown keyword.*bogus_key/)
    end

    it 'still accepts explicit struct instances in constructors' do
      # Ensure backwards compatibility - explicit struct instances should still work
      props = JsiiCalc::CalculatorProps.new(maximum_value: 200)
      calc = JsiiCalc::Calculator.new(props)
      calc.add(150)
      expect(calc.value).to eq(150)
      expect(calc.max_value).to eq(200)
    end

    it 'accepts keyword arguments directly for constructors' do
      # The most idiomatic Ruby pattern: keyword args passed as a trailing hash
      calc = JsiiCalc::Calculator.new(initial_value: 42, maximum_value: 1000)
      expect(calc.value).to eq(42)
      expect(calc.max_value).to eq(1000)
    end

    it 'accepts keyword arguments directly for instance methods taking a trailing struct' do
      # Ruby 3.x collapses keyword-syntax args into a final positional Hash
      # when the method has no explicit kwargs params; the generator's
      # `x = ::Struct.new(**x) if x.is_a?(Hash)` then coerces it.
      giver = JsiiCalc::GiveMeStructs.new
      expect(giver.read_first_number(astring: 'hello', anumber: 1337)).to eq(1337)
    end
  end

  describe 'Struct Deserialization' do
    it 'deserializes $jsii.struct tokens into instantiated struct classes recursively' do
      raw_struct = {
        '$jsii.struct' => {
          'fqn' => 'jsii-calc.TopLevelStruct',
          'data' => {
            'required' => 'hello',
            'secondLevel' => {
              '$jsii.struct' => {
                'fqn' => 'jsii-calc.SecondLevelStruct',
                'data' => {
                  'deeperRequiredProp' => 'nested'
                }
              }
            }
          }
        }
      }

      hydrated = Jsii::Serializer.load(raw_struct)

      expect(hydrated).to be_a(JsiiCalc::TopLevelStruct)
      expect(hydrated.required).to eq('hello')
      
      # Verifies recursive struct deserialization and JSII property mapping to Ruby keywords
      expect(hydrated.second_level).to be_a(JsiiCalc::SecondLevelStruct)
      expect(hydrated.second_level.deeper_required_prop).to eq('nested')
    end
  end
end
