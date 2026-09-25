# frozen_string_literal: true

require 'spec_helper'
require 'date'

# Suite tests: createObjectAndCtorOverloads, getSetPrimitiveProperties,
# getAndSetNonPrimitiveProperties, callMethods, statics, consts, subclassing,
# classWithPrivateConstructorAndAutomaticProperties,
# classesCanSelfReferenceDuringClassInitialization,
# objectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut,
# objRefsAreLabelledUsingWithTheMostCorrectType, receiveInstanceOfPrivateClass,
# classCanBeUsedWhenNotExpressedlyLoaded, downcasting,
# variadicMethodCanBeInvoked, fluentApi, testFluentApiWithDerivedClasses.
#
# Object lifecycle.  Constructor overloads, method calls, property get/set,
# statics/consts, native subclassing and factory methods for classes with
# private constructors.  The deep-machinery tests stress the *pending-object
# window*: during a kernel `create` request, the JS constructor may call back
# into Ruby with a reference to an object that hasn't been registered yet —
# Registry#find_by_ref falls back to Kernel#pending_object so `self`
# identity holds (classesCanSelfReferenceDuringClassInitialization,
# objectIdDoesNotGetReallocated...).  objRefsAreLabelledUsingWithTheMostCorrectType
# pins the kernel labelling rule for unexported types: a ref is tagged with
# the nearest *exported* ancestor class (or implemented interface), which is
# what makes the abstract-type tests possible at all.  `downcasting` covers
# the explicit Jsii.downcast unsafe-cast escape hatch.
RSpec.describe 'JSII compliance: classes and objects' do
  it 'instantiates classes with empty and non-empty constructors', compliance: 'createObjectAndCtorOverloads' do
    JsiiCalc::Calculator.new
    JsiiCalc::Calculator.new(maximum_value: 10)
  end

  it 'gets and sets primitive properties', compliance: 'getSetPrimitiveProperties' do
    number = Scope::JsiiCalcLib::Number.new(20)
    expect(number.value).to eq(20)
    expect(number.double_value).to eq(40)

    expect(JsiiCalc::Negate.new(JsiiCalc::Add.new(Scope::JsiiCalcLib::Number.new(20), Scope::JsiiCalcLib::Number.new(10))).value).to eq(-30)
  end

  it 'gets and sets non-primitive properties', compliance: 'getAndSetNonPrimitiveProperties' do
    calc = JsiiCalc::Calculator.new
    calc.add(3_200_000)
    calc.neg()
    calc.curr = JsiiCalc::Multiply.new(Scope::JsiiCalcLib::Number.new(2), calc.curr)
    expect(calc.value).to eq(-6_400_000)
  end

  it 'calls methods on host objects', compliance: 'callMethods' do
    calc = JsiiCalc::Calculator.new
    calc.add(10)
    expect(calc.value).to eq(10)

    calc.mul(2)
    expect(calc.value).to eq(20)

    calc.pow(5)
    expect(calc.value).to eq(20**5)

    calc.neg()
    expect(calc.value).to eq(-(20**5))
  end

  it 'invokes static methods and mutates static properties', compliance: 'statics' do
    expect(JsiiCalc::Statics.static_method('Yoyo')).to eq('hello ,Yoyo!')
    expect(JsiiCalc::Statics.instance.value).to eq('default')

    new_statics = JsiiCalc::Statics.new('new value')
    JsiiCalc::Statics.instance = new_statics

    expect(JsiiCalc::Statics.instance.value).to eq('new value')
    expect(JsiiCalc::Statics.non_const_static).to eq(100)

    # reset back to default for other tests
    JsiiCalc::Statics.instance = JsiiCalc::Statics.new('default')
  end

  it 'exposes constants', compliance: 'consts' do
    # const properties take an UPPER_SNAKE_CASE form in Ruby (matches Python's
    # `toPythonPropertyName(name, constant=true)`) so they don't collide with
    # a sibling snake_case property of the same lowercased name.
    expect(JsiiCalc::Statics.FOO).to eq('hello')
    expect(JsiiCalc::Statics.CONST_OBJ.hello).to eq('world')
    expect(JsiiCalc::Statics.BAR).to eq(1234)
    expect(JsiiCalc::Statics.ZOO_BAR['hello']).to eq('world')
  end

  it 'supports native subclasses of host classes', compliance: 'subclassing' do
    calc = JsiiCalc::Calculator.new
    calc.curr = AddTen.new(33)
    calc.neg
    expect(calc.value).to eq(-43)
  end

  it 'supports factory methods on classes with private constructors', compliance: 'classWithPrivateConstructorAndAutomaticProperties' do
    obj = JsiiCalc::ClassWithPrivateConstructorAndAutomaticProperties.create('Hello', 'Bye')
    expect(obj.read_write_string).to eq('Bye')
    expect(obj.read_only_string).to eq('Hello')
  end

  it 'lets classes reference themselves during initialization', compliance: 'classesCanSelfReferenceDuringClassInitialization' do
    klass = Class.new(JsiiCalc::Isomorphism) do
      include RSpec::Matchers
      def initialize
        super
        expect(self).to be(self.myself)
      end
    end
    klass.new
  end

  it 'does not reallocate the object id when the constructor passes this out', compliance: 'objectIdDoesNotGetReallocatedWhenTheConstructorPassesThisOut' do
    klass = Class.new(JsiiCalc::PartiallyInitializedThisConsumer) do
      include RSpec::Matchers
      def consume_partially_initialized_this(obj, dt, ev)
        expect(obj).not_to be_nil
        expect(dt).to be_a(DateTime)
        expect(ev).to eq(JsiiCalc::AllTypesEnum::THIS_IS_GREAT)
        'OK'
      end
    end

    reflector = klass.new
    obj = JsiiCalc::ConstructorPassesThisOut.new(reflector)
    expect(obj).not_to be_nil
  end

  # "Most correct" means: the most *derived* type that is still visible in
  # the assembly.  The fixture hierarchy (jsii-calc/lib/compliance.ts):
  #
  #   PublicClass (exported)
  #     └── InbetweenClass (exported, implements IPublicInterface2)
  #           └── PrivateClass (NOT exported, implements IPublicInterface)
  #
  # `Constructors.makeClass()` is *declared* to return PublicClass but
  # *actually* returns a PrivateClass.  Neither end of the spectrum is a
  # valid label for the ref:
  #
  #   - the declared type (PublicClass) is too general — the proxy would
  #     lose capabilities the object really has (ciao(), from
  #     InbetweenClass/IPublicInterface2), and is_a? checks would lie;
  #   - the runtime type (PrivateClass) is too specific — it isn't in the
  #     assembly, so no client has a generated proxy for it.
  #
  # The kernel must therefore label the ref with the nearest *exported*
  # ancestor, InbetweenClass, plus any exported interfaces the instance
  # implements beyond it (IPublicInterface, which only PrivateClass adds).
  # Ruby-side, Registry#jsii_deserialize trusts that label to pick the proxy
  # class.
  it 'labels object references with the most correct type', compliance: 'objRefsAreLabelledUsingWithTheMostCorrectType' do
    class_ref = JsiiCalc::Constructors.make_class()
    iface_ref = JsiiCalc::Constructors.make_interface()

    # Declared PublicClass, hydrated as the more-derived exported ancestor...
    expect(class_ref).to be_a(JsiiCalc::InbetweenClass)
    # ...which gives the proxy capabilities the declared type doesn't have.
    expect(class_ref.ciao).to eq('ciao')

    # Declared IPublicInterface — a capability InbetweenClass does NOT
    # carry, so the labelling must preserve the interface for the proxy to
    # be able to dispatch bye().
    expect(iface_ref).not_to be_nil
    expect(iface_ref.bye).to eq('bye')
  end

  it 'receives instances of private classes', compliance: 'receiveInstanceOfPrivateClass' do
    expect(JsiiCalc::ReturnsPrivateImplementationOfInterface.new.private_implementation.success).to be true
  end

  it 'safely returns types not expressly loaded by the user', compliance: 'classCanBeUsedWhenNotExpressedlyLoaded' do
    klass = Class.new(JsiiCalc::Cdk16625::Cdk16625) do
      def unwrap(gen)
        gen.next
      end
    end
    # This should NOT throw
    expect { klass.new.test }.not_to raise_error
  end

  it 'supports unsafe casts via Jsii.downcast', compliance: 'downcasting' do
    any_value = JsiiCalc::SomeTypeJsii976.return_anonymous
    real_value = Jsii.downcast(any_value, JsiiCalc::IReturnJsii976)
    expect(real_value.foo).to eq(1337)
  end

  it 'invokes variadic methods', compliance: 'variadicMethodCanBeInvoked' do
    variadic = JsiiCalc::VariadicMethod.new(1)
    expect(variadic.as_array(3, 4, 5, 6)).to eq([1, 3, 4, 5, 6])
  end

  it 'supports fluent-style construction', compliance: 'fluentApi' do
    calc3 = JsiiCalc::Calculator.new(initial_value: 20, maximum_value: 30)
    calc3.add(3)
    expect(calc3.value).to eq(23)
  end

  it 'supports fluent API with derived classes', compliance: 'testFluentApiWithDerivedClasses' do
    derived_from_all_types_class = Class.new(JsiiCalc::AllTypes)
    obj = derived_from_all_types_class.new
    obj.string_property = 'Hello'
    obj.number_property = 12

    expect(obj.string_property).to eq('Hello')
    expect(obj.number_property).to eq(12)
  end

  describe 'calculator behavior (extended)' do
    it 'supports Power operations' do
      expect(JsiiCalc::Power.new(Scope::JsiiCalcLib::Number.new(3), Scope::JsiiCalcLib::Number.new(4)).value).to eq(3**4)
      expect(JsiiCalc::Power.new(Scope::JsiiCalcLib::Number.new(999), Scope::JsiiCalcLib::Number.new(1)).value).to eq(999)
      expect(JsiiCalc::Power.new(Scope::JsiiCalcLib::Number.new(999), Scope::JsiiCalcLib::Number.new(0)).value).to eq(1)
    end

    it 'supports Multiply' do
      expect(JsiiCalc::Multiply.new(
        JsiiCalc::Add.new(Scope::JsiiCalcLib::Number.new(5), Scope::JsiiCalcLib::Number.new(5)),
        Scope::JsiiCalcLib::Number.new(2)
      ).value).to eq(20)
    end
  end

  describe 'static inheritance (extended)' do
    # jsii's StaticHello fixture documents the design fork: ES6 inherits
    # statics through the class hierarchy, Java does not.  Ruby naturally
    # matches ES6 — singleton methods inherit — so the generator emits a
    # static only on its *defining* class and lets Ruby inheritance (and the
    # kernel's base-chain lookup) do the rest.
    it 'resolves inherited statics through singleton-method inheritance' do
      # makeInstance is defined on JSII417PublicBaseOfBase (two erased
      # private classes up); JSII417Derived re-emits nothing — the call
      # resolves to the base stub, carrying the base fqn to the kernel.
      expect(JsiiCalc::JSII417Derived.make_instance).to be_a(JsiiCalc::JSII417PublicBaseOfBase)
    end

    it 'lets a child override parent statics (ES6 semantics)' do
      expect(JsiiCalc::StaticHelloParent.PROPERTY).to eq(1337)
      expect(JsiiCalc::StaticHelloParent.property).to eq(1337)

      # The child's own stubs shadow the inherited ones and carry the
      # child's fqn.
      expect(JsiiCalc::StaticHelloChild.PROPERTY).to eq(42)
      expect(JsiiCalc::StaticHelloChild.property).to eq(42)
      expect { JsiiCalc::StaticHelloChild.method() }.not_to raise_error
    end
  end

  describe 'inheritance (extended)' do
    it 'handles inheritance with no new properties' do
      # DerivedClassHasNoProperties::Derived inherits from Base
      # Base has 'prop'
      obj = JsiiCalc::DerivedClassHasNoProperties::Derived.new
      obj.prop = 'hello'
      expect(obj.prop).to eq('hello')
    end

    it 'handles cross-package inheritance' do
      # JsiiCalc::Add inherits from Scope::JsiiCalcLib::Operation
      add = JsiiCalc::Add.new(Scope::JsiiCalcLib::Number.new(1), Scope::JsiiCalcLib::Number.new(2))
      expect(add).to be_a(Scope::JsiiCalcLib::Operation)
      expect(add.value).to eq(3)
    end
  end
end
