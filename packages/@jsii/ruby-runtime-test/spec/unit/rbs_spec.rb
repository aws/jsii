# frozen_string_literal: true

require 'spec_helper'
require 'open3'
require 'tmpdir'
require 'fileutils'

# The generator emits RBS type signatures (`sig/<assembly>.rbs`) alongside the
# Ruby sources. Without a guard, nothing catches the generator emitting RBS that
# fails to parse/resolve — and the failure modes are real and easy to
# reintroduce (a bare `A | B` union collides with RBS's method-overload
# separator; a dangling superclass; a member whose signature drifts from the
# reserved-name mangling the `.rb` uses).
#
# These specs run `rbs validate` over the *actually generated* sigs for the
# jsii-calc closure, which exercises the tricky shapes (unions, optionals,
# variadics, DateTime, reserved-word members, structs, cross-assembly refs).
# The final example is a negative control proving the guard has teeth.
describe 'generated RBS signatures' do
  # Generated assembly sigs reference the runtime gem's own classes
  # (`::Jsii::Object`/`Struct`/`Enum`) as superclasses, so the runtime sig must
  # be on the load path too; `DateTime` requires the stdlib `date` library.
  runtime_sig   = File.expand_path('../../../ruby-runtime/sig', __dir__)
  generated_sig = File.expand_path('../../lib/ruby/sig', __dir__)

  def rbs_validate(*include_dirs)
    cmd = ['bundle', 'exec', 'rbs', '-r', 'date']
    include_dirs.each { |d| cmd.push('-I', d) }
    cmd.push('validate')
    out, status = Open3.capture2e(*cmd)
    [out, status.success?]
  end

  it 'are emitted for the whole jsii-calc dependency closure' do
    %w[jsii-calc.rbs @scope/jsii-calc-lib.rbs @scope/jsii-calc-base.rbs
       @scope/jsii-calc-base-of-base.rbs].each do |rel|
      expect(File.exist?(File.join(generated_sig, rel))).to be(true), "missing sig: #{rel}"
    end
  end

  it 'validate clean (runtime sig + generated sigs + the date library)' do
    out, ok = rbs_validate(runtime_sig, generated_sig)
    expect(ok).to be(true), "rbs validate failed:\n#{out}"
  end

  # The validate above is only meaningful if it actually covers the hard cases;
  # assert the tricky shapes are present in the emitted output (so a clean
  # validate is a clean validate *of these*, not of a degenerate signature).
  context 'the emitted jsii-calc sig' do
    let(:sig) { File.read(File.join(generated_sig, 'jsii-calc.rbs')) }

    it 'parenthesizes unions (the overload-separator hazard)' do
      # e.g. `Array[(Numeric | ::Scope::JsiiCalcLib::NumericValue)]`
      expect(sig).to match(/\([^()\n]+ \| [^()\n]+\)/)
    end

    it 'reflects reserved-word member mangling, matching the .rb' do
      # `next` is a Ruby keyword → `_next` in both the source and the sig.
      expect(sig).to match(/def _next:/)
    end

    it 'maps optionals to nilable types and variadics to splats' do
      expect(sig).to match(/\?\w+: [^,)]+\?/) # an optional kwarg with a nilable type
      expect(sig).to match(/\(\*/)            # a variadic parameter
    end

    it 'maps jsii Date to DateTime (which is why the date library is required)' do
      expect(sig).to match(/: DateTime/)
    end
  end

  it 'fail validation when a signature is malformed (negative control)' do
    Dir.mktmpdir do |dir|
      # A dangling superclass is exactly the class of error a generator
      # regression would produce; rbs must reject it.
      File.write(File.join(dir, 'broken.rbs'), <<~RBS)
        class BrokenProxy < ::Jsii::ClassThatDoesNotExist
        end
      RBS
      _out, ok = rbs_validate(runtime_sig, dir)
      expect(ok).to be(false), 'rbs validate unexpectedly passed on a dangling superclass'
    end
  end
end
