# frozen_string_literal: true

require 'spec_helper'

# Unit coverage for the fqn-guarded pending-object fallback in
# Registry#find_by_ref.  During a kernel `create`, the sidecar may fire
# callbacks that reference the object being constructed before its ref has
# been registered — that ref (and only that ref) must resolve to the
# in-flight instance.  Refs are labelled `<fqn>@<id>`, so an unknown ref
# carrying a *different* fqn is some other object entirely and must not be
# misrouted to the pending instance (the pre-guard behavior).
#
# These specs drive the registry and the kernel's per-thread pending stack
# directly (no wire traffic), using fake `jsii-calc.Fake*` refs that are
# scrubbed from the process-wide instance map afterwards.
RSpec.describe 'Registry pending-object fallback' do
  let(:kernel) { Jsii::Kernel.instance }
  let(:fqn) { 'jsii-calc.FakePendingType' }
  let(:ref) { "#{fqn}@990001" }
  let(:instance) { Jsii::Object.allocate }

  after do
    # Undo any eager ref binding so the process-wide registry stays clean
    # for the other suites.
    Jsii::Object.objects.delete_if { |key, _| key.start_with?('jsii-calc.Fake') }
  end

  # Push an entry onto the per-thread pending stack for the duration of the
  # block, exactly the way `Api#create_object` brackets its request.
  def with_pending(pending_instance, pending_fqn)
    kernel.push_pending_object(pending_instance, pending_fqn)
    yield
  ensure
    kernel.pop_pending_object
  end

  it 'resolves an unknown ref with the in-flight fqn to the pending instance' do
    with_pending(instance, fqn) do
      expect(Jsii::Object.find_by_ref(ref)).to be(instance)
    end
  end

  it 'accepts the wire-envelope Hash form of the ref' do
    with_pending(instance, fqn) do
      expect(Jsii::Object.find_by_ref({ '$jsii.byref' => ref })).to be(instance)
    end
  end

  it 'eagerly binds the ref so later lookups and re-registration agree' do
    with_pending(instance, fqn) do
      Jsii::Object.find_by_ref(ref)
    end

    # Bound during the fallback, so the ref stays resolvable after the
    # create window closes...
    expect(Jsii::Object.objects[ref]).to be(instance)

    # ...and the post-create register_instance re-registers the same
    # instance under the same ref without conflict.
    instance.instance_variable_set(:@jsii_ref, ref)
    Jsii::Object.register_instance(instance)
    expect(Jsii::Object.objects[ref]).to be(instance)
  end

  it 'does not resolve an unknown ref with a different fqn to the pending instance' do
    with_pending(instance, fqn) do
      expect(Jsii::Object.find_by_ref('jsii-calc.FakeOtherType@990002')).to be_nil
    end
  end

  it 'builds a fresh proxy for a different-fqn ref instead of misrouting it' do
    with_pending(instance, fqn) do
      other = Jsii::Object.from_jsii_ref('jsii-calc.FakeOtherType@990002', 'jsii-calc.FakeOtherType')
      expect(other).not_to be(instance)
      expect(other.jsii_ref).to eq('jsii-calc.FakeOtherType@990002')
    end
  end

  it 'resolves an outer in-flight instance from inside a nested create' do
    inner = Jsii::Object.allocate
    with_pending(instance, fqn) do
      with_pending(inner, 'jsii-calc.FakeInnerType') do
        expect(Jsii::Object.find_by_ref(ref)).to be(instance)
      end
    end
  end

  it 'skips pending entries whose create carries no instance' do
    with_pending(nil, fqn) do
      expect(Jsii::Object.find_by_ref(ref)).to be_nil
    end
  end

  it 'returns nil for an unknown ref when no construction is in flight' do
    expect(Jsii::Object.find_by_ref('jsii-calc.FakeAbsentType@990003')).to be_nil
  end
end
