# frozen_string_literal: true

require 'spec_helper'

# Suite tests: asyncOverrides_*, voidReturningAsync.
#
# Same callback dance as sync_overrides_spec.rb, but for `async` host
# methods, which use the kernel's begin/end API instead of `invoke`: `begin`
# starts the promise, callbacks for guest overrides are delivered while it's
# in flight, and `end` collects the settled result.  From Ruby the whole
# thing still looks synchronous.  Covered: plain override, override inherited
# from a parent class, override calling super, two overrides on one object,
# guest exceptions propagating back through the host promise
# (asyncOverrides_overrideThrows), and Promise<void> resolving to nil.
#
# Every magic number below falls out of the host fixture
# (jsii-calc/lib/compliance.ts):
#
#   export class AsyncVirtualMethods {
#     async callMe() {
#       return (await this.overrideMe(10)) + this.dontOverrideMe()
#                                          + (await this.overrideMeToo());
#     }
#     async overrideMe(mult) { return 12 * mult; }   // default impl
#     async overrideMeToo()  { return 0; }           // default impl
#     dontOverrideMe()       { return 8; }
#   }
#
# i.e.  call_me == overrideMe(10) + 8 + overrideMeToo()
#
# where each override* term is answered by the Ruby override (via callback)
# when one was registered at construction, and by the JS default when not.
#
# The OverrideAsyncMethodsByBaseClass, OverrideCallsSuper and TwoOverrides
# fixture classes are defined in spec/support/fixtures.rb.
RSpec.describe 'JSII compliance: async overrides' do
  it 'calls async methods synchronously from Ruby', compliance: 'asyncOverrides_callAsyncMethod' do
    # No subclass, no overrides: everything runs in JS with the defaults.
    obj = JsiiCalc::AsyncVirtualMethods.new
    # call_me = overrideMe(10) + 8 + overrideMeToo() = 120 + 8 + 0
    expect(obj.call_me()).to eq(128)
    # Direct kernel invoke of the default implementation: 12 * 44.
    expect(obj.override_me(44)).to eq(528)
  end

  it 'invokes guest overrides of async methods', compliance: 'asyncOverrides_overrideAsyncMethod' do
    class MyOverride < JsiiCalc::AsyncVirtualMethods
      def override_me(mult)
        mult * 2
      end
    end
    obj = MyOverride.new
    # callMe runs in JS; its `await this.overrideMe(10)` is delivered back to
    # Ruby as a callback (the override was registered with the kernel at
    # construction), so the first term is 10 * 2 = 20 instead of the default
    # 120:  call_me = 20 + 8 + 0.
    expect(obj.call_me()).to eq(28)
  end

  it 'invokes async overrides inherited from a parent class', compliance: 'asyncOverrides_overrideAsyncMethodByParentClass' do
    # The fixture's override ignores `mult` and delegates to a plain Ruby
    # helper (`foo`, returning 2222) — proving the callback runs in a real
    # Ruby context with access to the whole object, not some detached shim:
    # call_me = (2222 * 2) + 8 + 0 = 4452.
    obj = OverrideAsyncMethodsByBaseClass.new
    expect(obj.call_me).to eq(4452)
  end

  it 'lets async overrides call super', compliance: 'asyncOverrides_overrideCallsSuper' do
    # The fixture's override is `super(mult) * 10 + 1`.  `super` lands on the
    # generated forwarding stub, i.e. a kernel invoke — and the kernel knows
    # this client owns the override, so a client-initiated invoke of an
    # overridden member runs the *original JS implementation* instead of
    # bouncing back as a callback (that's how cross-boundary super avoids
    # infinite ping-pong).
    obj = OverrideCallsSuper.new
    # Called directly from Ruby: super(12) = 144, then 144 * 10 + 1.
    expect(obj.override_me(12)).to eq(1441)
    # Driven by JS: callMe → callback overrideMe(10) → super(10) = 120 →
    # 120 * 10 + 1 = 1201, then call_me = 1201 + 8 + 0.
    expect(obj.call_me).to eq(1209)
  end

  it 'supports two simultaneous async overrides', compliance: 'asyncOverrides_twoOverrides' do
    # Both await-ed terms answered by Ruby callbacks within one `begin`/`end`
    # cycle: call_me = 666 + 8 + 10.
    obj = TwoOverrides.new
    expect(obj.call_me).to eq(684)
  end

  it 'propagates exceptions raised in async overrides', compliance: 'asyncOverrides_overrideThrows' do
    klass = Class.new(JsiiCalc::AsyncVirtualMethods) do
      def override_me(mult)
        raise 'Thrown by native code'
      end
    end

    obj = klass.new
    # The callback's failure is reported back to the kernel, which rejects
    # the host-side callMe promise; `end` then surfaces the rejection as a
    # Jsii::RuntimeError carrying the original message.
    expect { obj.call_me }.to raise_error(Jsii::RuntimeError, /Thrown by native code/)
  end

  it 'handles Promise<void>-returning async methods', compliance: 'voidReturningAsync' do
    # Promise<void> resolves to `undefined`, which deserializes to nil.
    expect(JsiiCalc::PromiseNothing.new.instance_promise_it).to be_nil
  end

  describe 'async overrides (extended)' do
    it 'can override async methods while keeping non-overridden ones intact' do
      class OverrideAsyncMethods < JsiiCalc::AsyncVirtualMethods
        def override_me(mult)
          mult * 2
        end

        def dont_override_me
          8
        end

        def override_me_too
          0
        end
      end

      obj = OverrideAsyncMethods.new
      # call_me = (10 * 2) + 8 + 0 = 28.  Note the Ruby dont_override_me also
      # returns 8, so the sum is 28 whether or not the kernel (incorrectly)
      # routed that term through the override — the middle term's *source* is
      # not distinguishable here, only the override of overrideMe is.
      expect(obj.call_me()).to eq(28)
      # Plain Ruby dispatch (no kernel involved): 44 * 2.
      expect(obj.override_me(44)).to eq(88)
    end

    it 'propagates ArgumentError from an async override (not just StandardError)' do
      klass = Class.new(JsiiCalc::AsyncVirtualMethods) do
        def override_me(mult)
          raise ArgumentError, 'argument blew up'
        end
      end

      expect { klass.new.call_me }.to raise_error(Jsii::RuntimeError, /argument blew up/)
    end

    it 'propagates TypeError from an async override' do
      klass = Class.new(JsiiCalc::AsyncVirtualMethods) do
        def override_me(mult)
          raise TypeError, 'wrong type'
        end
      end

      expect { klass.new.call_me }.to raise_error(Jsii::RuntimeError, /wrong type/)
    end
  end
end
