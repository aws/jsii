require 'spec_helper'

# Regression for: kernel callback dispatch must honor the generator's
# reserved-name rename, so a JSII member named `break` finds the
# generated `_break` method on the Ruby override.
RSpec.describe 'reserved-name callback dispatch' do
  before(:all) do
    Object.const_set(:ReservedWordImpl, Class.new do
      include JsiiCalc::IJavaReservedWordsInAnInterface
      attr_accessor :calls
      def initialize; @calls = []; end
      def _break;    @calls << :break;    nil; end
      def _while;    @calls << :while;    'w'; end
      def _class;    @calls << :class;    nil; end
    end) unless Object.const_defined?(:ReservedWordImpl)
  end

  it "dispatches an invoke({ method: 'break' }) callback to the generated `_break`" do
    obj = ReservedWordImpl.new
    # Force JSII registration of the native object so the kernel can address it.
    ref = Jsii::Kernel.instance.send(:serialize_native_implementations, obj)
    expect(ref).to be_a(Hash)
    objref = ref['$jsii.byref']

    Jsii::Kernel.instance.send(
      :handle_callback_invoke,
      { 'objref' => { '$jsii.byref' => objref }, 'method' => 'break', 'args' => [] }
    )
    expect(obj.calls).to eq([:break])
  end

  it "dispatches a get({ property: 'while' }) callback to the generated `_while`" do
    obj = ReservedWordImpl.new
    ref = Jsii::Kernel.instance.send(:serialize_native_implementations, obj)
    objref = ref['$jsii.byref']
    result = Jsii::Kernel.instance.send(
      :handle_callback_get,
      { 'objref' => { '$jsii.byref' => objref }, 'property' => 'while' }
    )
    expect(result).to eq('w')
  end
end
