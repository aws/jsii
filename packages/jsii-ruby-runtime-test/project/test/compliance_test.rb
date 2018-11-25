require 'jsii-calc-ruby'
require 'test/unit'
require 'test/unit/ui/console/testrunner'

class JsiiComplianceTest < Test::Unit::TestCase
  def test_primitive_types
    compliance "primitiveTypes"

    types = Jsii::Calc::AllTypes.new
    types.boolean_property = true
    assert_equal true, types.boolean_property
  end

  private

  def compliance(name)
    puts "---------------| COMPLIANCE TEST |---------------"
    puts name
    puts "-------------------------------------------------"
  end

  # /**
  #  * Verify that we can marshal and unmarshal objects without type information.
  #  */
  # @Test
  # public void primitiveTypes() throws IOException {
  #     AllTypes types = new AllTypes();
  #
  #     // boolean
  #     types.setBooleanProperty(true);
  #     assertEquals(true, types.getBooleanProperty());
  #
  #     // string
  #     types.setStringProperty("foo");
  #     assertEquals("foo", types.getStringProperty());
  #
  #     // number
  #     types.setNumberProperty(1234);
  #     assertEquals(1234, types.getNumberProperty());
  #
  #     // date
  #     types.setDateProperty(Instant.ofEpochMilli(123));
  #     assertEquals(Instant.ofEpochMilli(123), types.getDateProperty());
  #
  #     // json
  #     types.setJsonProperty((ObjectNode) new ObjectMapper().readTree("{ \"Foo\": 123 }"));
  #     assertEquals(123, types.getJsonProperty().get("Foo").numberValue());
  # }

end
