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

  private

  def compliance(name)
    puts "---------------| COMPLIANCE TEST |---------------"
    puts name
    puts "-------------------------------------------------"
  end
end
