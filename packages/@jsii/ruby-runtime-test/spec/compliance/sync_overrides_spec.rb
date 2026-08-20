# frozen_string_literal: true

require 'spec_helper'
require 'json'

# Suite tests: syncOverrides, syncOverrides_callsSuper,
# fail_syncOverrides_callsDoubleAsync_{method,propertyGetter,propertySetter},
# callbacksCorrectlyDeserializeArguments.
#
# The re-entrant callback path.  When a host method like `caller_is_method`
# synchronously invokes a guest override mid-request, the wire protocol nests
# a `callback` message inside the still-pending `invoke` — the Ruby kernel
# must answer the callback before its own request can complete.
# `callsSuper` goes one level deeper: the guest override re-enters the
# kernel *again* from inside the callback.  The three fail_* tests assert the
# kernel correctly *refuses* an async call made from a sync callback context
# (it would deadlock the single request pipe), surfaced as Jsii::Error.
#
# The SyncOverrides fixture class is defined in spec/support/fixtures.rb.
RSpec.describe 'JSII compliance: sync overrides' do
  it 'invokes guest overrides of sync virtual methods', compliance: 'syncOverrides' do
    obj = SyncOverrides.new
    expect(obj.caller_is_method).to eq(10 * 5)

    obj.multiplier = 5
    expect(obj.caller_is_method).to eq(10 * 5 * 5)

    # verify callbacks are invoked from a property
    expect(obj.caller_is_property).to eq(10 * 5 * 5)

    # and from an async method
    obj.multiplier = 3
    expect(obj.caller_is_async).to eq(10 * 5 * 3)
  end

  it 'lets sync overrides call super', compliance: 'syncOverrides_callsSuper' do
    obj = SyncOverrides.new
    expect(obj.caller_is_property).to eq(10 * 5)
    obj.return_super = true
    expect(obj.caller_is_property).to eq(10 * 2)
  end

  it 'raises when an async method is called from a sync override (method)', compliance: 'fail_syncOverrides_callsDoubleAsync_method' do
    obj = SyncOverrides.new
    obj.call_async = true

    expect { obj.caller_is_method }.to raise_error(Jsii::Error)
  end

  it 'raises when an async method is called from a sync override (property getter)', compliance: 'fail_syncOverrides_callsDoubleAsync_propertyGetter' do
    obj = SyncOverrides.new
    obj.call_async = true

    expect { obj.caller_is_property }.to raise_error(Jsii::Error)
  end

  it 'raises when an async method is called from a sync override (property setter)', compliance: 'fail_syncOverrides_callsDoubleAsync_propertySetter' do
    obj = SyncOverrides.new
    obj.call_async = true

    expect { obj.caller_is_property = 12 }.to raise_error(Jsii::Error)
  end

  it 'correctly deserializes callback arguments', compliance: 'callbacksCorrectlyDeserializeArguments' do
    klass = Class.new(JsiiCalc::DataRenderer) do
      def render_map(map)
        super(map)
      end
    end
    renderer = klass.new

    result = renderer.render({ anumber: 42, astring: 'bazinga!' })
    # Compare structurally — the exact `JSON.stringify` formatting is a
    # Node-implementation detail and can change across Node versions.
    expect(JSON.parse(result)).to eq({ 'anumber' => 42, 'astring' => 'bazinga!' })
  end
end
