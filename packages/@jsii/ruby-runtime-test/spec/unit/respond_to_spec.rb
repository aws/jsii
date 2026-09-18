require 'spec_helper'

RSpec.describe 'respond_to?' do
  it 'returns false for to_ary and other internal coercions' do
    types = JsiiCalc::AllTypes.new
    expect(types.respond_to?(:to_ary)).to be false
    expect(types.respond_to?(:to_hash)).to be false
    expect(types.respond_to?(:to_str)).to be false
    expect(types.respond_to?(:to_proc)).to be false
    expect(types.respond_to?(:to_int)).to be false
    expect(types.respond_to?(:to_io)).to be false
  end

  it 'does NOT blackhole jsii methods that happen to start with to_' do
    # Earlier the dispatcher rejected anything `to_*`, which broke common JSII
    # member names like `toString`, `toJSON`, `toArray` (all snake-cased to
    # `to_string`, `to_json`, `to_array`).  Now we should claim to respond
    # to them so they dispatch to the kernel normally.
    types = JsiiCalc::AllTypes.new
    expect(types.respond_to?(:to_string)).to be true
    expect(types.respond_to?(:to_json)).to be true
    expect(types.respond_to?(:to_array)).to be true
  end

  it 'returns true for dynamic methods forwarded to JSII' do
    types = JsiiCalc::AllTypes.new
    
    # We should claim to respond to typical JSII properties/methods dynamically
    expect(types.respond_to?(:dynamic_foo)).to be true
    expect(types.respond_to?(:some_unknown_method)).to be true
  end

  it 'returns false and raises NoMethodError for invalid JSII patterns (like operators)' do
    types = JsiiCalc::AllTypes.new
    
    expect(types.respond_to?(:+)).to be false
    expect { types + 1 }.to raise_error(NoMethodError)
    
    expect(types.respond_to?(:foo?)).to be false
    expect { types.foo? }.to raise_error(NoMethodError)
  end
end
