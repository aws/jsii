# frozen_string_literal: true

require 'spec_helper'

# Suite tests: propertyOverrides_*, canOverrideProtected{Method,Getter,Setter},
# doNotOverridePrivates_*.
#
# Virtual *properties*: guest getter/setter overrides invoked by host code,
# with and without `super`, with guest exceptions propagating back as
# Jsii::RuntimeError.  canOverrideProtected* confirms TS-`protected` members
# are exposed in the assembly and overridable from Ruby.  The six
# doNotOverridePrivates_* are the inverse guarantee: TS-`private` members
# are not in the assembly at all, so a guest method that merely *collides*
# by name must never be wired up as an override — checked for both public
# and `private` Ruby visibility, for methods and for properties.
#
# The SyncOverrides fixture class is defined in spec/support/fixtures.rb.
RSpec.describe 'JSII compliance: property overrides' do
  it 'invokes guest overrides of property getters and setters', compliance: 'propertyOverrides_get_set' do
    so = SyncOverrides.new
    expect(so.retrieve_value_of_the_property).to eq('I am an override!')
    so.modify_value_of_the_property('New Value')
    expect(so.another_the_property).to eq('New Value')
  end

  it 'lets property getter overrides call super', compliance: 'propertyOverrides_get_calls_super' do
    klass = Class.new(JsiiCalc::SyncVirtualMethods) do
      def the_property
        "super:#{super}"
      end

      def the_property=(value)
        super(value)
      end
    end

    so = klass.new
    expect(so.retrieve_value_of_the_property).to eq('super:initial value')
    expect(so.the_property).to eq('super:initial value')
  end

  it 'lets property setter overrides call super', compliance: 'propertyOverrides_set_calls_super' do
    klass = Class.new(JsiiCalc::SyncVirtualMethods) do
      def the_property
        super
      end

      def the_property=(value)
        super("#{value}:by override")
      end
    end

    so = klass.new
    so.modify_value_of_the_property('New Value')
    expect(so.the_property).to eq('New Value:by override')
  end

  it 'propagates exceptions raised in property getter overrides', compliance: 'propertyOverrides_get_throws' do
    klass = Class.new(JsiiCalc::SyncVirtualMethods) do
      def the_property
        raise 'Oh no, this is bad'
      end

      def the_property=(value)
        super(value)
      end
    end

    so = klass.new
    expect { so.retrieve_value_of_the_property }.to raise_error(Jsii::RuntimeError, /Oh no, this is bad/)
  end

  it 'propagates exceptions raised in property setter overrides', compliance: 'propertyOverrides_set_throws' do
    klass = Class.new(JsiiCalc::SyncVirtualMethods) do
      def the_property
        super
      end

      def the_property=(value)
        raise 'Exception from overloaded setter'
      end
    end

    so = klass.new
    expect { so.modify_value_of_the_property('Hii') }.to raise_error(Jsii::RuntimeError, /Exception from overloaded setter/)
  end

  it 'overrides properties of host interfaces', compliance: 'propertyOverrides_interfaces' do
    klass = Class.new do
      include JsiiCalc::IInterfaceWithProperties

      attr_reader :read_only_string

      def initialize
        @x = nil
        @read_only_string = 'READ_ONLY_STRING'
      end

      def read_write_string
        "#{@x}?"
      end

      def read_write_string=(value)
        @x = "#{value}!"
      end
    end

    obj = klass.new
    interact = JsiiCalc::UsesInterfaceWithProperties.new(obj)
    expect(interact.just_read).to eq('READ_ONLY_STRING')
    expect(interact.write_and_read('Hello')).to eq('Hello!?')
  end

  describe 'protected members' do
    it 'overrides protected methods', compliance: 'canOverrideProtectedMethod' do
      klass = Class.new(JsiiCalc::OverridableProtectedMember) do
        def override_me
          "Cthulhu Fhtagn!"
        end
      end

      overridden = klass.new
      expect(overridden.value_from_protected()).to eq("Cthulhu Fhtagn!")
    end

    it 'overrides protected getters', compliance: 'canOverrideProtectedGetter' do
      klass = Class.new(JsiiCalc::OverridableProtectedMember) do
        def override_read_only
          "Cthulhu "
        end

        def override_read_write
          "Fhtagn!"
        end
      end

      overridden = klass.new
      expect(overridden.value_from_protected()).to eq("Cthulhu Fhtagn!")
    end

    it 'overrides protected setters', compliance: 'canOverrideProtectedSetter' do
      klass = Class.new(JsiiCalc::OverridableProtectedMember) do
        def override_read_write
          super
        end

        def override_read_write=(value)
          super("zzzzzzzzz#{value}")
        end
      end

      overridden = klass.new
      overridden.switch_modes()
      expect(overridden.value_from_protected()).to eq("Bazzzzzzzzzzzaar...")
    end
  end

  describe 'private members are not overridable' do
    it 'ignores a public guest method shadowing a private host method', compliance: 'doNotOverridePrivates_method_public' do
      klass = Class.new(JsiiCalc::DoNotOverridePrivates) do
        def private_method
          'privateMethod-Override'
        end
      end
      obj = klass.new
      expect(obj.private_method_value).to eq('privateMethod')
    end

    it 'ignores a private guest method shadowing a private host method', compliance: 'doNotOverridePrivates_method_private' do
      klass = Class.new(JsiiCalc::DoNotOverridePrivates) do
        private def private_method
          'privateMethod-Override'
        end
      end
      obj = klass.new
      expect(obj.private_method_value).to eq('privateMethod')
    end

    it 'ignores a public guest property shadowing a private host property (by name)', compliance: 'doNotOverridePrivates_property_by_name_public' do
      klass = Class.new(JsiiCalc::DoNotOverridePrivates) do
        def private_property
          'privateProperty-Override'
        end
      end
      obj = klass.new
      expect(obj.private_property_value).to eq('privateProperty')
    end

    it 'ignores a private guest property shadowing a private host property (by name)', compliance: 'doNotOverridePrivates_property_by_name_private' do
      klass = Class.new(JsiiCalc::DoNotOverridePrivates) do
        private def private_property
          'privateProperty-Override'
        end
      end
      obj = klass.new
      expect(obj.private_property_value).to eq('privateProperty')
    end

    it 'ignores public guest getter/setter shadowing a private host property', compliance: 'doNotOverridePrivates_property_getter_public' do
      klass = Class.new(JsiiCalc::DoNotOverridePrivates) do
        def private_property
          'privateProperty-Override'
        end

        def private_property=(value)
          raise 'Boom'
        end
      end
      obj = klass.new
      expect(obj.private_property_value).to eq('privateProperty')

      # setter override is also not invoked
      obj.change_private_property_value('MyNewValue')
      expect(obj.private_property_value).to eq('MyNewValue')
    end

    it 'ignores private guest getter/setter shadowing a private host property', compliance: 'doNotOverridePrivates_property_getter_private' do
      klass = Class.new(JsiiCalc::DoNotOverridePrivates) do
        private def private_property
          'privateProperty-Override'
        end

        private def private_property=(value)
          raise 'Boom'
        end
      end
      obj = klass.new
      expect(obj.private_property_value).to eq('privateProperty')

      # setter override is also not invoked
      obj.change_private_property_value('MyNewValue')
      expect(obj.private_property_value).to eq('MyNewValue')
    end
  end
end
