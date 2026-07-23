# frozen_string_literal: true

require 'spec_helper'

# CONTRACT: Jsii::Error#missing_member? classifies "member not found" errors
# by string-matching the wording @jsii/kernel puts in its error messages —
# there is no structured error code on the wire to key off.
# DynamicInvocation#method_missing uses that classification to fall through
# to Ruby's normal method_missing chain (NoMethodError) instead of
# re-raising, so an upstream rewording would silently turn every dynamic
# dispatch fallback into a hard Jsii::Error raise.  These examples trigger
# the real errors through the actual kernel sidecar (the same way the
# compliance specs drive it) so a wording change fails the suite instead.
#
# Wording pinned by the sidecar as of this writing:
#   get / set -> "Type jsii-calc.Calculator doesn't have a property 'x'"
#   invoke    -> "Class jsii-calc.Calculator doesn't have a method 'x'"
RSpec.describe 'Jsii::Error#missing_member? kernel wording contract' do
  let(:calculator) { JsiiCalc::Calculator.new }

  # Run the block, which must be rejected by the kernel, and return the error.
  def kernel_error
    yield
    raise 'expected the kernel to reject the request with a Jsii::Error'
  rescue Jsii::Error => e
    e
  end

  it 'classifies the kernel error for getting an unknown property' do
    error = kernel_error do
      Jsii::Kernel.instance.get_property(calculator.jsii_ref, 'definitelyNotAJsiiMember')
    end

    expect(error.missing_member?)
      .to be(true), "kernel rewording broke missing_member? for get: #{error.message.inspect}"
  end

  it 'classifies the kernel error for setting an unknown property' do
    error = kernel_error do
      Jsii::Kernel.instance.set_property(calculator.jsii_ref, 'definitelyNotAJsiiMember', 42)
    end

    expect(error.missing_member?)
      .to be(true), "kernel rewording broke missing_member? for set: #{error.message.inspect}"
  end

  it 'classifies the kernel error for invoking an unknown method' do
    error = kernel_error do
      Jsii::Kernel.instance.call_method(calculator.jsii_ref, 'definitelyNotAJsiiMember', [])
    end

    expect(error.missing_member?)
      .to be(true), "kernel rewording broke missing_member? for invoke: #{error.message.inspect}"
  end

  it 'routes an unknown member through method_missing to NoMethodError end-to-end' do
    # The no-arg dynamic path tries `get`, then `invoke`; BOTH kernel errors
    # must classify as missing-member for the call to reach Ruby's
    # NoMethodError instead of surfacing a Jsii::Error.
    expect { calculator.definitely_not_a_jsii_member }.to raise_error(NoMethodError)
  end
end
