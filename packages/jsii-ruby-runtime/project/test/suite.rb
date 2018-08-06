require 'test/unit/testsuite'
require_relative 'jsii_runtime_test'

# Tests for jsii_runtime
class JsiiRuntimeTests
  def self.suite
    suite = Test::Unit::TestSuite.new
    suite << JsiiRuntimeTest.suite
    suite
  end
end

Test::Unit::UI::Console::TestRunner.run(JsiiRuntimeTests)
