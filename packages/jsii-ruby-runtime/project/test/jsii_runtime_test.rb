require 'test/unit'
require 'test/unit/ui/console/testrunner'
require_relative '../lib/jsii_runtime'

# Tests for Aws::Jsii::Runtime
class JsiiRuntimeTest < Test::Unit::TestCase
  def setup
    @version = File.read(File.join(File.dirname(__FILE__), '..', 'version.txt')).strip
    @client = Aws::Jsii::Runtime.new

    load_test_module('jsii-calc-base-of-base', '@scope/jsii-calc-base-of-base')
    load_test_module('jsii-calc-base', '@scope/jsii-calc-base')
    load_test_module('jsii-calc-lib', '@scope/jsii-calc-lib')
    load_test_module('jsii-calc', 'jsii-calc')
  end

  def teardown
    @client.close
  end

  def test_api
    objref = @client.create(fqn: '@scope/jsii-calc-lib.Number', args: [42])
    assert_equal({ 'value' => 84 }, @client.get(objref: objref, property: 'doubleValue'))
    assert_equal({ 'result' => 'Number' }, @client.invoke(objref: objref, method: 'typeName'))

    calc_props = { 'initialValue' => 100 }

    calc = @client.create(fqn: 'jsii-calc.Calculator', args: [calc_props])
    @client.invoke(objref: calc, method: 'add', args: [50])

    curr = @client.get(objref: calc, property: 'curr')['value']
    assert_equal({ 'value' => 150 }, @client.get(objref: curr, property: 'value'))

    naming = @client.naming(assembly: '@scope/jsii-calc-lib')['naming']
    assert_equal('software.amazon.jsii.tests.calculator.lib', naming['java']['package'])

    @client.del(objref: calc)
    assert_raise { @client.get(objref: calc, property: 'curr') }

    assert_equal({ 'value' => 'hello' }, @client.sget(fqn: 'jsii-calc.Statics', property: 'Foo'))
    assert_equal({ 'result' => 'hello ,Foo!' }, @client.sinvoke(fqn: 'jsii-calc.Statics', method: 'staticMethod', args: ['Foo']))
  end

  def test_async_callbacks
    objref = @client.create(
      fqn: 'jsii-calc.AsyncVirtualMethods',
      overrides: [{ method: 'overrideMe', cookie: 'myCookie' }]
    )

    promise = @client.begin(objref: objref, method: 'callMe')
    assert_equal({ 'promiseid' => 'jsii::promise::10002' }, promise)

    callbacks = @client.callbacks['callbacks']
    assert_equal(1, callbacks.length)
    first = callbacks[0]
    assert_equal('overrideMe', first['invoke']['method'])
    assert_equal('myCookie', first['cookie'])
    assert_equal(1, first['invoke']['args'].length)
    assert_equal(10, first['invoke']['args'][0])

    # simulate an error response from the callback and expect "end" to raise
    @client.complete(cbid: first['cbid'], err: 'hello, error')
    assert_raise { @client.end(promiseid: promise['promiseid']) }
  end

  def test_overrides
    objref = @client.create(
      fqn: 'jsii-calc.SyncVirtualMethods',
      overrides: [{ method: 'virtualMethod', cookie: 'myCookie' }]
    )

    @client.on_callback do |cb|
      invoke = cb['invoke']
      assert(!invoke.nil?)
      assert_equal(objref, invoke['objref'])
      assert_equal('virtualMethod', invoke['method'])
      assert_equal(10, invoke['args'][0])
      assert_equal('myCookie', cb['cookie'])

      num = @client.create(fqn: '@scope/jsii-calc-lib.Number', args: [42])
      assert_equal({ 'value' => 84 }, @client.get(objref: num, property: 'doubleValue'))

      # return value
      898
    end

    result = @client.invoke(objref: objref, method: 'callerIsMethod')
    assert_equal({ 'result' => 898 }, result)
  end

  def test_overrides_error
    objref = @client.create(
      fqn: 'jsii-calc.SyncVirtualMethods',
      overrides: [{ method: 'virtualMethod', cookie: 'myCookie' }]
    )

    @client.on_callback do
      raise 'error from a callback'
    end

    assert_raise Aws::Jsii::JsiiError do
      @client.invoke(objref: objref, method: 'callerIsMethod')
    end
  end

  private

  def load_test_module(file_name, module_name)
    tarball = File.join(File.dirname(__FILE__), 'jsii-calc', "#{file_name}@#{@version}.jsii.tgz")
    @client.load(tarball: tarball, name: module_name, version: @version)
  end
end
