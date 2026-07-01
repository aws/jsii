# frozen_string_literal: true

require 'spec_helper'
require 'time'

# Suite tests: testInterfaces, canUseInterfaceSetters, testInterfaceParameter,
# testLiteralInterface, testJSObjectLiteralToNative,
# testNativeObjectsWithInterfaces, creationOfNativeObjectsFromJavaScriptObjects,
# pureInterfacesCanBeUsedTransparently (+_WhenTransitivelyImplementing),
# interfacesCanBeUsedTransparently_WhenAddedToJsiiType,
# canLeverageIndirectInterfacePolymorphism, callbackParameterIsInterface,
# interfaceBuilder, returnSubclassThatImplementsInterface976.
#
# Interfaces are a two-way street.  Host→guest: consuming JS objects through
# interface-typed returns — interface fqns are registered as Ruby *modules*,
# so a ref that resolves to one hydrates as `Jsii::Object.allocate.extend(mod)`
# (see Registry#build_uninitialized_instance).  Guest→host: Ruby classes that
# `include JsiiCalc::ISomething` and get passed to JS consumers; the runtime
# registers them with an *overrides list* so JS-side calls (e.g. `bell.ring`)
# come back as callbacks into the Ruby method.  The guest direction also
# pins down *identity*: a native object passed into the kernel must come back
# `equal?`-identical, via the process-wide objects map
# (testNativeObjectsWithInterfaces, creationOfNativeObjectsFromJavaScriptObjects).
#
# Why interface modules exist at all in a duck-typed language: they are not
# Ruby typing, they are *wire-protocol declaration*.  jsii is nominally
# typed, and the contract crosses a process boundary the duck can't swim:
#
#   - Outbound (guest implements host interface): passing a native object to
#     a host API sends a kernel `create` with an explicit `interfaces:` list
#     of fqns, gathered by Object#jsii_interfaces from included modules that
#     carry a jsii_fqn.  The Node side builds its proxy from that list — it
#     never probes the Ruby object for methods, so "responds to the right
#     messages" is unserializable; `include IFoo` is the one-line nominal
#     fact the protocol demands.  (Python's binding needs @jsii.implements
#     decorators for the same reason.)
#   - Inbound (host returns an interface): refs labelled only with an
#     interface fqn hydrate as Jsii::Object.allocate.extend(mod) — the
#     module carries the forwarding stubs, camelCase↔snake_case mapping and
#     reserved-name slugification (next ↔ _next).
#   - Ergonomics: mixins make is_a?(IDoublable) behave like instanceof
#     elsewhere, and required members are validated at construction (fail
#     fast) instead of erroring later inside a Node-side callback.
#
# For merely *consuming* host objects the modules are nearly cosmetic; it is
# the guest-implements-host-interface (callback) direction where they are
# load-bearing.  This mirrors Ruby's own Comparable/Enumerable idiom:
# modules as declared contracts.
RSpec.describe 'JSII compliance: interfaces' do
  it 'supports the full interface hierarchy (IFriendly, IFriendlier, IRandomNumberGenerator)', compliance: 'testInterfaces' do
    add = JsiiCalc::Add.new(Scope::JsiiCalcLib::Number.new(10), Scope::JsiiCalcLib::Number.new(20))
    expect(add.hello).to eq("Hello, I am a binary operation. What's your name?")

    # Multiply implements three interfaces at once — hello from IFriendly
    # (via BinaryOperation), goodbye from IFriendlier, next from
    # IRandomNumberGenerator — so each value below is a canary proving the
    # member dispatched to the right interface's implementation.  The 89 is
    # not arithmetic: it's Multiply's hardcoded, deliberately fake "random
    # number generator" (calculator.ts: `public next() { return 89; }`).
    multiply = JsiiCalc::Multiply.new(Scope::JsiiCalcLib::Number.new(10), Scope::JsiiCalcLib::Number.new(30))
    expect(multiply.hello).to eq("Hello, I am a binary operation. What's your name?")
    expect(multiply.goodbye).to eq('Goodbye from Multiply!')
    expect(multiply.next).to eq(89)

    poly = JsiiCalc::Polymorphism.new
    expect(poly.say_hello(multiply)).to eq("oh, Hello, I am a binary operation. What's your name?")
  end

  it 'generates setters for read-write interface properties', compliance: 'canUseInterfaceSetters' do
    obj = JsiiCalc::ObjectWithPropertyProvider.provide
    obj.property = 'New Value'
    expect(obj.was_set).to be true
  end

  it 'passes interfaces as method parameters', compliance: 'testInterfaceParameter' do
    obj = JsiiCalc::JSObjectLiteralForInterface.new
    friendly = obj.give_me_friendly
    augmenter = JsiiCalc::GreetingAugmenter.new

    expect(friendly.hello).to eq('I am literally friendly!')
    expect(augmenter.better_greeting(friendly)).to eq('I am literally friendly! Let me buy you a drink!')
  end

  it 'consumes JS object literals implementing an interface', compliance: 'testLiteralInterface' do
    obj = JsiiCalc::JSObjectLiteralForInterface.new
    friendly = obj.give_me_friendly
    gen = obj.give_me_friendly_generator

    expect(friendly.hello).to eq('I am literally friendly!')
    expect(gen.hello).to eq('giveMeFriendlyGenerator')
    expect(gen.next).to eq(42)
  end

  it 'unmarshals JS object literals to native objects', compliance: 'testJSObjectLiteralToNative' do
    obj = JsiiCalc::JSObjectLiteralToNative.new
    obj2 = obj.return_literal
    expect(obj2.prop_a).to eq('Hello')
    expect(obj2.prop_b).to eq(102)
  end

  it 'preserves identity of native objects implementing host interfaces', compliance: 'testNativeObjectsWithInterfaces' do
    pure_native = PureNativeFriendlyRandom.new
    subclassed_native = SubclassNativeFriendlyRandom.new

    generator_bound_to_subclassed_object = JsiiCalc::NumberGenerator.new(subclassed_native)
    expect(generator_bound_to_subclassed_object.generator).to be(subclassed_native)
    generator_bound_to_subclassed_object.is_same_generator(subclassed_native)
    expect(generator_bound_to_subclassed_object.next_times100()).to eq(10000)
    expect(generator_bound_to_subclassed_object.next_times100()).to eq(20000)

    generator_bound_to_pure_native = JsiiCalc::NumberGenerator.new(pure_native)
    expect(generator_bound_to_pure_native.generator).to be(pure_native)
    generator_bound_to_pure_native.is_same_generator(pure_native)
    expect(generator_bound_to_pure_native.next_times100()).to eq(100000)
    expect(generator_bound_to_pure_native.next_times100()).to eq(200000)
  end

  it 'creates native objects from JavaScript objects and back', compliance: 'creationOfNativeObjectsFromJavaScriptObjects' do
    types = JsiiCalc::AllTypes.new

    js_obj = Scope::JsiiCalcLib::Number.new(44)
    types.any_property = js_obj
    unmarshalled_js_obj = types.any_property
    expect(unmarshalled_js_obj.class).to eq(Scope::JsiiCalcLib::Number)

    native_obj = AddTen.new(10)
    types.any_property = native_obj
    result1 = types.any_property
    expect(result1).to be(native_obj)

    native_obj2 = MulTen.new(20)
    types.any_property = native_obj2
    unmarshalled_native_obj = types.any_property
    expect(unmarshalled_native_obj.class).to eq(MulTen)
    expect(unmarshalled_native_obj).to be(native_obj2)
  end

  it 'lets host consumers use guest implementations of pure interfaces', compliance: 'pureInterfacesCanBeUsedTransparently' do
    class MyFriendly < Jsii::Object
      include Scope::JsiiCalcLib::IFriendly
      def hello
        "Greetings!"
      end
    end

    # Jsii requires a base class for creation.
    # Since MyFriendly doesn't inherit from a proxy, we use JsiiCalc::AllTypes for testing.
    class CustomFriendly < JsiiCalc::AllTypes
      include Scope::JsiiCalcLib::IFriendly
      def hello
        "Custom!"
      end
    end

    friendly = CustomFriendly.new
    poly = JsiiCalc::Polymorphism.new
    expect(poly.say_hello(friendly)).to eq('oh, Custom!')
  end

  it 'lets guest delegates return structs through pure interfaces', compliance: 'pureInterfacesCanBeUsedTransparently_WhenTransitivelyImplementing' do
    expected = JsiiCalc::StructB.new(required_string: "It's Britney b**ch!")

    delegate_class = Class.new do
      include JsiiCalc::IStructReturningDelegate
      def return_struct
        JsiiCalc::StructB.new(required_string: "It's Britney b**ch!")
      end
    end

    delegate = delegate_class.new
    consumer = JsiiCalc::ConsumePureInterface.new(delegate)
    result = consumer.work_it_baby
    expect(result.required_string).to eq(expected.required_string)
  end

  it 'supports implementing multiple host interfaces on one guest class', compliance: 'interfacesCanBeUsedTransparently_WhenAddedToJsiiType' do
    class MultiInterfaceResource < JsiiCalc::AllTypes
      include Scope::JsiiCalcLib::IFriendly
      include Scope::JsiiCalcLib::IDoublable

      attr_reader :double_value

      def initialize(value)
        super()
        @double_value = value * 2
      end

      def hello
        "I am multi-talented!"
      end
    end

    obj = MultiInterfaceResource.new(10)

    # Verify role 1: IFriendly
    poly = JsiiCalc::Polymorphism.new
    expect(poly.say_hello(obj)).to eq('oh, I am multi-talented!')

    # Verify role 2: IDoublable
    expect(obj).to be_a(Scope::JsiiCalcLib::IDoublable)
    expect(obj.double_value).to eq(20)
  end

  it 'leverages indirect interface polymorphism', compliance: 'canLeverageIndirectInterfacePolymorphism' do
    provider = JsiiCalc::AnonymousImplementationProvider.new
    expect(provider.provide_as_class.value).to eq(1337)
    expect(provider.provide_as_interface.value).to eq(1337)
    expect(provider.provide_as_interface.verb).to eq('to implement')
  end

  it 'passes pure interfaces to callbacks', compliance: 'callbackParameterIsInterface' do
    bell_ringer_class = Class.new do
      include JsiiCalc::IBellRinger
      def your_turn(bell)
        bell.ring
      end
    end

    concrete_bell_ringer_class = Class.new do
      include JsiiCalc::IConcreteBellRinger
      def your_turn(bell)
        bell.ring
      end
    end

    bell_ringer = bell_ringer_class.new
    concrete_bell_ringer = concrete_bell_ringer_class.new

    expect(JsiiCalc::ConsumerCanRingBell.static_implemented_by_object_literal(bell_ringer)).to be true
    expect(JsiiCalc::ConsumerCanRingBell.static_implemented_by_public_class(bell_ringer)).to be true
    expect(JsiiCalc::ConsumerCanRingBell.static_implemented_by_private_class(bell_ringer)).to be true
    expect(JsiiCalc::ConsumerCanRingBell.static_when_typed_as_class(concrete_bell_ringer)).to be true

    consumer = JsiiCalc::ConsumerCanRingBell.new
    expect(consumer.implemented_by_object_literal(bell_ringer)).to be true
    expect(consumer.implemented_by_public_class(bell_ringer)).to be true
    expect(consumer.implemented_by_private_class(bell_ringer)).to be true
    expect(consumer.when_typed_as_class(concrete_bell_ringer)).to be true
  end

  it 'builds guest objects implementing interface properties', compliance: 'interfaceBuilder' do
    klass = Class.new do
      include JsiiCalc::IInterfaceWithProperties

      attr_reader :read_only_string

      def initialize
        @x = 'READ_WRITE'
        @read_only_string = 'READ_ONLY'
      end

      def read_write_string
        @x
      end

      def read_write_string=(value)
        @x = value
      end
    end

    obj = klass.new
    interact = JsiiCalc::UsesInterfaceWithProperties.new(obj)
    expect(interact.just_read).to eq('READ_ONLY')
    expect(interact.write_and_read('Hello')).to eq('Hello')
  end

  it 'returns subclasses that implement an interface (jsii#976)', compliance: 'returnSubclassThatImplementsInterface976' do
    obj = JsiiCalc::SomeTypeJsii976.return_return
    expect(obj.foo).to eq(333)
  end

  describe 'interface behavior (extended)' do
    it 'returns anonymous implementations of interfaces' do
      expect(JsiiCalc::SomeTypeJsii976.return_anonymous).not_to be_nil
    end

    it 'handles diamond inheritance via interfaces' do
      class DiamondImplementation < JsiiCalc::AllTypes
        include Scope::JsiiCalcLib::IFriendly
        include Scope::JsiiCalcLib::IDoublable

        def hello
          "Diamond hello"
        end

        def double_value
          42
        end
      end

      obj = DiamondImplementation.new
      poly = JsiiCalc::Polymorphism.new
      expect(poly.say_hello(obj)).to eq('oh, Diamond hello')
      expect(obj.double_value).to eq(42)
    end

    it 'can use interfaces from submodules' do
      class MyReflectable < JsiiCalc::AllTypes
        include Scope::JsiiCalcLib::Submodule::IReflectable
        def entries
          [Scope::JsiiCalcLib::Submodule::ReflectableEntry.new(key: 'k', value: Scope::JsiiCalcLib::Number.new(123))]
        end
      end

      obj = MyReflectable.new
      reflector = Scope::JsiiCalcLib::Submodule::Reflector.new
      map = reflector.as_map(obj)
      expect(map['k'].value).to eq(123)
    end

    it 'enforces strict interface validation' do
      class InvalidReflectable < JsiiCalc::AllTypes
        include Scope::JsiiCalcLib::Submodule::IReflectable
        # missing required `entries` method!
      end

      expect { InvalidReflectable.new }.to raise_error(RuntimeError, /missing required method\/property: entries/)
    end

    it 'can extend and implement from jsii' do
      klass = Class.new(JsiiCalc::PythonSelf::ClassWithSelf) do
        include JsiiCalc::IWallClock
        def initialize(now)
          super(now)
          @now = now
        end
        def iso8601_now
          @now
        end
      end

      mild_entropy_class = Class.new(JsiiCalc::Entropy) do
        def repeat(word)
          word
        end
      end

      now_str = Time.now.utc.iso8601
      wall_clock = klass.new(now_str)
      entropy = mild_entropy_class.new(wall_clock)
      expect(entropy.increase).to eq(now_str)
    end
  end
end
