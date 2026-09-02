require 'spec_helper'

describe Jsii::Kernel::Callbacks do
  let(:callbacks_class) do
    Class.new do
      include Jsii::Kernel::Callbacks
    end
  end
  let(:callbacks) { callbacks_class.new }

  before do
    allow(Jsii::Kernel).to receive(:instance).and_return(double('kernel'))
  end

  describe '#handle_callback_invoke' do
    it 'escapes reserved words in method names correctly' do
      objref = 'mock@123'
      instance = double('JsiiObject')
      allow(Jsii::Object).to receive(:find_by_ref).with(objref).and_return(instance)
      
      invoke_req = {
        'objref' => objref,
        'method' => 'send', # JS name is 'send'
        'args' => []
      }

      # We expect __send__ to be called with '_send' as the method name
      expect(instance).to receive(:__send__).with('_send')

      callbacks.send(:handle_callback_invoke, invoke_req)
    end
  end

  describe '#handle_callback_get' do
    it 'escapes reserved words in property names correctly' do
      objref = 'mock@123'
      instance = double('JsiiObject')
      allow(Jsii::Object).to receive(:find_by_ref).with(objref).and_return(instance)
      
      get_req = {
        'objref' => objref,
        'property' => 'class' # JS name is 'class'
      }

      expect(instance).to receive(:__send__).with('_class')
      callbacks.send(:handle_callback_get, get_req)
    end
  end

  describe '#handle_callback_set' do
    it 'escapes reserved words in property setters correctly' do
      objref = 'mock@123'
      instance = double('JsiiObject')
      allow(Jsii::Object).to receive(:find_by_ref).with(objref).and_return(instance)
      
      set_req = {
        'objref' => objref,
        'property' => 'class', # JS name is 'class'
        'value' => 'new_value'
      }

      expect(instance).to receive(:__send__).with('_class=', 'new_value')
      callbacks.send(:handle_callback_set, set_req)
    end
  end
end
