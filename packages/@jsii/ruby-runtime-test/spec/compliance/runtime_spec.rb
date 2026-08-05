# frozen_string_literal: true

require 'spec_helper'

# Suite tests: testJsiiAgent, nodeStandardLibrary, exceptions, exceptionMessage,
# strippedDeprecatedMemberCanBeReceived.
#
# Environment plumbing for the Node.js child process the kernel runs in:
# the JSII_AGENT env var must identify this runtime ("Ruby/<version>") to
# host code, the child is a real Node so fs/os/crypto must work, JS `throw`
# must surface as Jsii::RuntimeError with the original message intact, and
# assemblies compiled with --strip-deprecated must not blow up at runtime
# when a stripped member's type is received.
RSpec.describe 'JSII compliance: runtime environment' do
  it 'reports Ruby language and version in JSII_AGENT', compliance: 'testJsiiAgent' do
    # The kernel sets JSII_AGENT=Ruby/<version> on spawn, so this should
    # always be populated.  If it's not, the runtime regressed and we want
    # to know loudly — no `skip` fallback.
    expect(JsiiCalc::JsiiAgent.value).to match(/^Ruby\/\d+\.\d+\.\d+/)
  end

  it 'exposes the Node standard library (fs, os, crypto)', compliance: 'nodeStandardLibrary' do
    obj = JsiiCalc::NodeStandardLibrary.new
    expect(obj.fs_read_file).to eq('Hello, resource!')
    expect(obj.fs_read_file_sync).to eq('Hello, resource! SYNC!')
    expect(obj.os_platform.length).to be > 0
    expect(obj.crypto_sha256).to eq('6a2da20943931e9834fc12cfe5bb47bbd9ae43489a30726962b576f4e3993e50')
  end

  it 'raises host errors as Jsii::RuntimeError', compliance: 'exceptions' do
    calc = JsiiCalc::Calculator.new(initial_value: 20, maximum_value: 30)
    calc.add(3)
    expect(calc.value).to eq(23)

    expect { calc.add(10) }.to raise_error(Jsii::RuntimeError)

    calc.max_value = 40
    calc.add(10)
    expect(calc.value).to eq(33)
  end

  it 'forwards custom exception messages from JS', compliance: 'exceptionMessage' do
    # AcceptsPath is in the cdk22369 submodule.  The submodule is in the
    # jsii-calc assembly, so a missing constant means the generator dropped
    # it — fail loudly rather than silently passing.
    expect { JsiiCalc::Cdk22369::AcceptsPath.new(source_path: 'A Bad Path') }.to raise_error(Jsii::RuntimeError, /Cannot find asset/)
  end

  it 'receives members whose deprecated parts were stripped', compliance: 'strippedDeprecatedMemberCanBeReceived' do
    expect(Scope::JsiiCalcLib::DeprecationRemoval::InterfaceFactory.create).not_to be_nil
  end

  describe 'runtime behavior (extended)' do
    it 'makes dependency submodule types usable' do
      subject = JsiiCalc::UpcasingReflectable.new('foo' => 'bar')
      expect(JsiiCalc::UpcasingReflectable.REFLECTOR.as_map(subject)).to eq('FOO' => 'bar')
    end
  end
end
