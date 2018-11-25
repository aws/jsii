require 'jsii-calc-ruby'
require 'test/unit'
require 'test/unit/ui/console/testrunner'
require 'date'

class JsiiComplianceTest < Test::Unit::TestCase
  def test_primitive_types
    compliance 'primitiveTypes'

    types = Jsii::Calc::AllTypes.new

    # boolean
    types.boolean_property = true
    assert_equal true, types.boolean_property

    # string
    types.string_property = 'foo'
    assert_equal 'foo', types.string_property

    # number
    types.number_property = 1234
    assert_equal 1234, types.number_property

    # date
    types.date_property = DateTime.parse('2018-11-25T08:17:49+00:00')
    assert_equal DateTime.parse('2018-11-25T08:17:49+00:00'), types.date_property

    # json
    types.json_property = { 'foo' => 12, 'bar' => { 'hello' => 'world' } }
    expected = { 'foo' => 12, 'bar' => { 'hello' => 'world' } }
    assert_equal expected, types.json_property
  end

  def test_dates
    compliance 'date' # TODO: duplicate with "dynamicTypes"

    types = Jsii::Calc::AllTypes.new

    # strong type
    types.date_property = DateTime.parse('2018-11-25T08:17:49+00:00')
    assert_equal DateTime.parse('2018-11-25T08:17:49+00:00'), types.date_property

    # week type
    types.any_property = DateTime.parse('2018-01-01T01:01:01+00:00')
    assert_equal DateTime.parse('2018-01-01T01:01:01+00:00'), types.any_property
  end

  def test_collection_types
    compliance 'collectionTypes'

    types = Jsii::Calc::AllTypes.new

    # array
    types.array_property = [ 'hello', 'world' ]
    assert_equal 'world', types.array_property[1]

    # map
    types.map_property = { "Foo" => 123 }
    assert_equal 123, types.map_property["Foo"]
  end

  def test_dynamic_types
    compliance 'dynamicTypes'

    types = Jsii::Calc::AllTypes.new

    # boolean
    types.any_property = false
    assert_equal false, types.any_property

    # string
    types.any_property = 'string'
    assert_equal 'string', types.any_property

    # number
    types.any_property = 12
    assert_equal 12, types.any_property

    # date
    types.any_property = DateTime.parse('2018-11-25T08:17:49+00:00')
    assert_equal DateTime.parse('2018-11-25T08:17:49+00:00'), types.any_property

    # json
    types.any_property = { "Goo": [ "Hello", { "World": 123 } ] }
    assert_equal 123, types.any_property["Goo"][1]["World"]

    # array
    types.any_property = [ "Hello", "World" ]
    assert_equal "Hello", types.any_property[0]
    assert_equal "World", types.any_property[1]

    # array of any
    types.any_array_property = [ "Hybrid", Jsii::CalcLib::Number.new(12), 123, false ]
    assert_equal 123, types.any_array_property[2]

    # map
    types.any_property = { "MapKey" => "MapValue" }
    assert_equal "MapValue", types.any_property["MapKey"]

    # map of any
    types.any_map_property = {
      "MapKey" => "MapValue",
      "Goo" => 19289812
    }
    assert_equal 19289812, types.any_map_property["Goo"]

    # classes
    mult = Jsii::Calc::Multiply.new(Jsii::CalcLib::Number.new(10), Jsii::CalcLib::Number.new(20))
    types.any_property = mult
    assert_same mult, types.any_property
    assert_true types.any_property.kind_of?(Jsii::Calc::Multiply)
    assert_equal 200, types.any_property.value
  end

  def test_union_types
    compliance "unionTypes"

    types = Jsii::Calc::AllTypes.new

    # number
    types.union_property = 1234
    assert_equal 1234, types.union_property

    # string
    types.union_property = 'hello'
    assert_equal 'hello', types.union_property

    # object
    types.union_property = Jsii::Calc::Multiply.new(Jsii::CalcLib::Number.new(2), Jsii::CalcLib::Number.new(12))
    assert_equal 24, types.union_property.value

    # map
    types.union_map_property = { "Foo" => Jsii::Calc::Multiply.new(Jsii::CalcLib::Number.new(2), Jsii::CalcLib::Number.new(99)) }
    assert_equal 2 * 99, types.union_map_property["Foo"].value

    # array
    types.union_array_property = [ "Hello", 123, Jsii::CalcLib::Number.new(33) ]
    assert_equal 33, types.union_array_property[2].value
  end

  def test_create_object_and_ctor_overloads
    compliance "createObjectAndCtorOverloads"

    Jsii::Calc::Calculator.new
    Jsii::Calc::Calculator.new({ maximum_value: 10 })
  end

  def test_get_set_primitive_properties
    compliance "getSetPrimitiveProperties"

    number = Jsii::CalcLib::Number.new(20)
    assert_equal 20, number.value
    assert_equal 40, number.double_value
    assert_equal -30, Jsii::Calc::Negate.new(
      Jsii::Calc::Add.new(
        Jsii::CalcLib::Number.new(20),
        Jsii::CalcLib::Number.new(10))).value

    assert_equal 20, Jsii::Calc::Multiply.new(
      Jsii::Calc::Add.new(
        Jsii::CalcLib::Number.new(5),
        Jsii::CalcLib::Number.new(5)),
      Jsii::CalcLib::Number.new(2)).value

    assert_equal 3 * 3 * 3 * 3, Jsii::Calc::Power.new(
      Jsii::CalcLib::Number.new(3),
      Jsii::CalcLib::Number.new(4)).value

    assert_equal 999, Jsii::Calc::Power.new(
      Jsii::CalcLib::Number.new(999),
      Jsii::CalcLib::Number.new(1)).value

    assert_equal 1, Jsii::Calc::Power.new(
      Jsii::CalcLib::Number.new(999),
      Jsii::CalcLib::Number.new(0)).value
  end

  def test_call_methods
    compliance "callMethods"

    calc = Jsii::Calc::Calculator.new
    calc.add(10); assert_equal 10, calc.value
    calc.mul(2);  assert_equal 20, calc.value
    calc.pow(5);  assert_equal 20 * 20 * 20 * 20 * 20, calc.value
    calc.neg;     assert_equal -3200000, calc.value
  end

  def test_unmarshall_into_abstract_type
    compliance "unmarshallIntoAbstractType"

    calc = Jsii::Calc::Calculator.new
    calc.add 120

    value = calc.curr
    assert_equal 120, value.value
  end

  def test_get_and_set_non_primitive_properties
    compliance "getAndSetNonPrimitiveProperties"

    calc = Jsii::Calc::Calculator.new
    calc.add 3200000
    calc.neg
    calc.curr = Jsii::Calc::Multiply.new(Jsii::CalcLib::Number.new(2), calc.curr)
    assert_equal -6400000, calc.value
  end

  def test_get_and_set_enum_values
    compliance "getAndSetEnumValues"

    calc = Jsii::Calc::Calculator.new
    calc.add 9
    calc.pow 3
    assert_equal Jsii::Calc::CompositeOperation::CompositionStringStyle::NORMAL, calc.string_style
    calc.string_style = Jsii::Calc::CompositeOperation::CompositionStringStyle::DECORATED
    assert_equal '<<[[{{(((1 * (0 + 9)) * (0 + 9)) * (0 + 9))}}]]>>', calc.to_string
  end

  def test_use_enum_from_scoped_module
    compliance "useEnumFromScopedModule"

    obj = Jsii::Calc::ReferenceEnumFromScopedPackage.new
    assert_equal Jsii::CalcLib::EnumFromScopedModule::VALUE2, obj.foo

    obj.foo = Jsii::CalcLib::EnumFromScopedModule::VALUE1
    assert_equal Jsii::CalcLib::EnumFromScopedModule::VALUE1, obj.load_foo

    obj.save_foo Jsii::CalcLib::EnumFromScopedModule::VALUE2
    assert_equal Jsii::CalcLib::EnumFromScopedModule::VALUE2, obj.foo
  end

  private

  def compliance(name)
    puts "COMPLIANCE TEST: #{name}"
  end
end
