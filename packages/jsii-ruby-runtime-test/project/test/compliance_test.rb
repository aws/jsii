require 'jsii-calc-ruby'
require 'test/unit'
require 'test/unit/ui/console/testrunner'
require 'date'

class JsiiComplianceTest < Test::Unit::TestCase
  def test_primitive_types
    compliance "primitiveTypes"

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

  private

  def compliance(name)
    puts "---------------| COMPLIANCE TEST |---------------"
    puts name
    puts "-------------------------------------------------"
  end

  #
  #     // json
  #     types.setJsonProperty((ObjectNode) new ObjectMapper().readTree("{ \"Foo\": 123 }"));
  #     assertEquals(123, types.getJsonProperty().get("Foo").numberValue());
  # }

end
