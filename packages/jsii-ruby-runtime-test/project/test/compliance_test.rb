require 'jsii-calc-ruby'
require 'test/unit'
require 'test/unit/ui/console/testrunner'

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
  end

  private

  def compliance(name)
    puts "---------------| COMPLIANCE TEST |---------------"
    puts name
    puts "-------------------------------------------------"
  end

  #     // date
  #     types.setDateProperty(Instant.ofEpochMilli(123));
  #     assertEquals(Instant.ofEpochMilli(123), types.getDateProperty());
  #
  #     // json
  #     types.setJsonProperty((ObjectNode) new ObjectMapper().readTree("{ \"Foo\": 123 }"));
  #     assertEquals(123, types.getJsonProperty().get("Foo").numberValue());
  # }

end
