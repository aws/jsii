# frozen_string_literal: true

require 'spec_helper'
require 'open3'

# Generated assemblies are emitted as a thin loader (`lib/<assembly>.rb`) plus
# one file per namespace-direct type, wired together with `Module#autoload`
# (for constant references in user code) and `Jsii::Object.register_autoload`
# (for fqns the kernel hands back that the user never named — the pervasive
# case in CDK: `vpc.public_subnets`, `bucket.grant_read`, ...).
#
# The full compliance suite exercises both paths incidentally, but nothing in
# it would *fail loudly* if lazy loading silently reverted to eager `class`
# definitions, or if a load trigger regressed. These specs pin that behaviour.
#
# They run in a *fresh* Ruby process so referencing and load order are fully
# controlled — the aggregate suite loads types in an order that can mask
# forward-reference and "loaded too early" bugs. The kernel-touching
# `Jsii::Assembly.load` is neutralised in the child, so no node sidecar is
# needed and the checks are pure Ruby autoload mechanics.
describe 'lazy (autoload) code generation' do
  # Run an assertion script against the generated jsii-calc in a clean
  # interpreter; returns [stdout+stderr, success?].
  def run_in_fresh_process(body)
    lib_path = File.expand_path('../../lib/ruby/lib', __dir__)
    script = <<~RUBY
      lib = #{lib_path.inspect}
      $LOAD_PATH.unshift(lib, File.join(lib, '@scope'))
      require 'jsii'

      # We're testing pure-Ruby autoload wiring; neutralise the kernel-touching
      # assembly load so the child needs no node sidecar and stays deterministic.
      Jsii::Assembly.define_singleton_method(:load) { |*| nil }

      require 'jsii-calc'

      $failures = []
      def check(cond, msg) = ($failures << msg unless cond)

      #{body}

      if $failures.empty?
        puts 'AUTOLOAD_OK'
      else
        $failures.each { |m| warn "ASSERT FAILED: \#{m}" }
        exit 1
      end
    RUBY

    Open3.popen3('bundle', 'exec', 'ruby', '-') do |stdin, stdout, stderr, wait|
      stdin.write(script)
      stdin.close
      out = stdout.read + stderr.read
      [out, wait.value.success?]
    end
  end

  it 'defers type definitions instead of eager-loading them' do
    out, ok = run_in_fresh_process(<<~RUBY)
      total  = Jsii::Object.autoload_paths.size
      loaded = Jsii::Object.registry.keys.count { |k| k.start_with?('jsii-calc') }
      check(total > 100, "expected many registered autoload paths, got \#{total}")
      # Requiring the loader must not have defined the type bodies.
      check(loaded < total / 4, "too many types eager-loaded: \#{loaded}/\#{total}")
    RUBY
    expect(out).to include('AUTOLOAD_OK'), out
    expect(ok).to be(true), out
  end

  it 'loads a type on first constant reference, resolving cross-file forward refs' do
    out, ok = run_in_fresh_process(<<~RUBY)
      check(JsiiCalc.autoload?(:Calculator), 'Calculator is not autoload-pending after require')
      check(!Jsii::Object.registry.key?('jsii-calc.Calculator'), 'Calculator was loaded too early')

      klass = JsiiCalc::Calculator # triggers the autoload, and its forward refs

      check(Jsii::Object.registry['jsii-calc.Calculator'].equal?(klass),
            'Calculator did not self-register on load')
      check(klass.jsii_fqn == 'jsii-calc.Calculator',
            "Calculator fqn wrong: \#{klass.jsii_fqn.inspect}")
      # Its superclass lives in a different generated file; touching Calculator
      # must transitively autoload it without a NameError.
      check(klass.superclass == JsiiCalc::Composition::CompositeOperation,
            "forward-ref superclass not resolved: \#{klass.superclass}")
    RUBY
    expect(out).to include('AUTOLOAD_OK'), out
    expect(ok).to be(true), out
  end

  it 'hydrates a kernel-returned fqn the user never referenced (the CDK trap)' do
    out, ok = run_in_fresh_process(<<~RUBY)
      # Pick any registered type that has NOT been loaded — i.e. its constant
      # was never referenced. This is exactly what the kernel hands back for
      # the bulk of an object graph.
      fqn = Jsii::Object.autoload_paths.keys.find { |f| !Jsii::Object.registry.key?(f) }
      check(!fqn.nil?, 'no unreferenced type available to test the fallback')

      if fqn
        resolved = Jsii::Object.find_class_by_fqn(fqn)
        check(!resolved.nil?, "find_class_by_fqn(\#{fqn}) returned nil")
        check(Jsii::Object.registry.key?(fqn),
              "\#{fqn} not registered after load-on-miss")
      end
    RUBY
    expect(out).to include('AUTOLOAD_OK'), out
    expect(ok).to be(true), out
  end
end
