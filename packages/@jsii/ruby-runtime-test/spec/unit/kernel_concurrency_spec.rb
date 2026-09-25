# frozen_string_literal: true

require 'spec_helper'

# Smoke tests for the kernel's threading invariants.  These cannot catch
# every race, but they reliably catch regressions of the mutex / thread-local
# pending-object refactor by exercising the patterns those changes target.
RSpec.describe 'Kernel concurrency' do
  it 'serializes concurrent requests without corrupting the response stream' do
    # Without the kernel mutex, the JSON frames on stdin/stdout would
    # interleave and JSON.parse would blow up (or the wrong thread would
    # consume another thread's response).
    threads = 8.times.map do |i|
      Thread.new do
        n = Scope::JsiiCalcLib::Number.new(i + 1)
        expect(n.value).to eq(i + 1)
      end
    end
    threads.each(&:join)
  end

  it 'keeps `pending_object` per-thread across concurrent constructions' do
    # Two threads constructing different objects simultaneously must not
    # see each other's pending instances.  With a shared @pending_object
    # they would race; with a thread-local stack they don't.
    seen = Queue.new

    threads = 4.times.map do |i|
      Thread.new do
        n = Scope::JsiiCalcLib::Number.new(i)
        seen << [i, n.value]
      end
    end
    threads.each(&:join)

    results = []
    results << seen.pop until seen.empty?
    expect(results.sort).to eq([[0, 0], [1, 1], [2, 2], [3, 3]])
  end

  it 'supports re-entrant kernel calls from a single thread' do
    # An override that itself calls back into the kernel exercises the
    # Monitor's re-entrancy.  Without re-entrancy, the second call would
    # deadlock waiting on the lock the current thread already holds.
    inner_values = Queue.new
    klass = Class.new(JsiiCalc::SyncVirtualMethods) do
      define_method(:virtual_method) do |n|
        # During the kernel's callback dispatch we synchronously make another
        # kernel call.  Without a re-entrant lock this would deadlock.
        inner = Scope::JsiiCalcLib::Number.new(n)
        inner_values << inner.value
        n * 3
      end
    end

    expect(klass.new.caller_is_method).to eq(10 * 3)
    expect(inner_values.pop).to eq(10)
  end
end
