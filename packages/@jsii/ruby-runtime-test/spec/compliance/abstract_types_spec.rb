# frozen_string_literal: true

require 'spec_helper'

# Suite tests: abstractMembersAreCorrectlyHandled, returnAbstract,
# unmarshallIntoAbstractType.
#
# Abstractness only exists at the TypeScript level — on the wire there are
# just object refs and member names, and the Ruby proxy generated for an
# abstract class has a concrete forwarding stub for *every* member (abstract
# or not).  These tests verify both directions: a guest subclass supplying
# the abstract members to a host driver (abstractMembersAreCorrectlyHandled,
# via callbacks), and the kernel returning values *declared* as abstract
# types (returnAbstract, unmarshallIntoAbstractType).
RSpec.describe 'JSII compliance: abstract types' do
  it 'handles abstract properties and methods correctly', compliance: 'abstractMembersAreCorrectlyHandled' do
    klass = Class.new(JsiiCalc::AbstractSuite) do
      def initialize
        super
        @property_val = nil
      end

      def some_method(str)
        "Wrapped<#{str}>"
      end

      def property
        @property_val
      end

      def property=(value)
        @property_val = "String<#{value}>"
      end
    end

    abstract_suite = klass.new
    expect(abstract_suite.work_it_all('Oomf!')).to eq('Wrapped<String<Oomf!>>')
  end

  # The TS fixture (jsii-calc/lib/compliance.ts) behind this test:
  #
  #   export abstract class AbstractClassBase { abstract readonly abstractProperty: string; }
  #   export abstract class AbstractClass extends AbstractClassBase
  #       implements IInterfaceImplementedByAbstractClass { ... }
  #   class ConcreteClass extends AbstractClass { ... }       // NOT exported!
  #   export class AbstractClassReturner {
  #     giveMeAbstract(): AbstractClass { return new ConcreteClass(); }
  #     giveMeInterface(): IInterfaceImplementedByAbstractClass { return new ConcreteClass(); }
  #     get returnAbstractFromProperty(): AbstractClassBase {
  #       return { abstractProperty: 'hello-abstract-property' };  // plain object literal!
  #     }
  #   }
  #
  # This exercises three progressively nastier hydration cases — see the
  # inline comments.  In all of them the key trick is that
  # Registry#build_uninitialized_instance hydrates refs with `klass.allocate`
  # (NOT `klass.new`), so no constructor runs and "you cannot instantiate an
  # abstract class" never comes up.
  it 'returns abstract classes and interfaces from the kernel', compliance: 'returnAbstract' do
    obj = JsiiCalc::AbstractClassReturner.new

    # Case 1: the kernel returns an instance of *unexported* ConcreteClass,
    # declared as the *abstract* AbstractClass.  ConcreteClass isn't in the
    # assembly, so the kernel labels the ref with the nearest exported
    # ancestor: `$jsii.byref: "jsii-calc.AbstractClass@..."`.  The registry
    # resolves that fqn to the generated JsiiCalc::AbstractClass proxy and
    # allocates it without calling initialize.
    obj2 = obj.give_me_abstract

    # Calls through the abstract proxy are plain virtual dispatch in JS: the
    # kernel invokes the member on the *real* object, so ConcreteClass's
    # implementation of the abstract method runs...
    expect(obj2.abstract_method('John')).to eq('Hello, John!!')
    # ...the interface-provided getter on AbstractClass answers a `get`...
    expect(obj2.prop_from_interface).to eq('propFromInterfaceValue')
    # ...and the inherited non-abstract base implementation works too.
    expect(obj2.non_abstract_method).to eq(42)

    # Case 2: same ConcreteClass instance, but the declared return type is a
    # pure interface.  Interface fqns register as Ruby *modules*, which can't
    # be allocated — the registry builds `Jsii::Object.allocate.extend(mod)`
    # instead, so the module's forwarding stubs (and is_a? checks) work.
    iface = obj.give_me_interface
    expect(iface.prop_from_interface).to eq('propFromInterfaceValue')

    # Case 3: the JS getter returns a plain `{ abstractProperty: ... }`
    # object literal — no class at all.  The kernel still wraps it in a ref,
    # but labels it "Object"; Registry#jsii_deserialize's fallback chain
    # (`$jsii.interfaces`.first, then the ref's fqn prefix) picks the declared
    # abstract type so the property read can be forwarded.
    expect(obj.return_abstract_from_property.abstract_property).to eq('hello-abstract-property')
  end

  it 'unmarshalls values into abstract types', compliance: 'unmarshallIntoAbstractType' do
    calc = JsiiCalc::Calculator.new
    calc.add(120)
    expect(calc.curr.value).to eq(120)
  end

  describe 'abstract types (extended)' do
    # The jsii-relevant part of subclassing an abstract host class is
    # construction: the kernel must instantiate an *abstract* fqn on behalf
    # of the guest by synthesizing a JS subclass, with the guest's overrides
    # registered (see object/overrides.rb).  Calling the overridden members
    # from Ruby would only exercise plain Ruby dispatch — host-driven
    # callback dispatch is covered by abstractMembersAreCorrectlyHandled
    # above — so instead we call the members the guest did NOT override:
    # those go through the generated forwarding stubs to the kernel, proving
    # the instance is live on the JS side.
    it 'can construct native subclasses of abstract host classes' do
      klass = Class.new(JsiiCalc::AbstractClass) do
        def abstract_method(name)
          "Hello, #{name}!"
        end

        def abstract_property
          'native-abstract-property'
        end
      end

      obj = klass.new
      expect(obj.jsii_ref).not_to be_nil

      # Non-overridden members dispatch through the kernel to the host
      # implementations on AbstractClass.
      expect(obj.non_abstract_method).to eq(42)
      expect(obj.prop_from_interface).to eq('propFromInterfaceValue')
    end
  end
end
