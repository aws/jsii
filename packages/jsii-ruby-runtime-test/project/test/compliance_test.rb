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
    compliance 'dates'

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

  private

  def compliance(name)
    puts "---------------| COMPLIANCE TEST |---------------"
    puts name
    puts "-------------------------------------------------"
  end
end
