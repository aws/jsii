# frozen_string_literal: true

require 'spec_helper'

# Suite tests: collectionTypes, arrays, maps, arrayReturnedByMethod*,
# mapReturnedByMethod*, listInClass*, mapInClass*, staticListInClass*,
# staticMapInClass*, collectionOfInterfaces_*.
#
# Arrays and maps in every position: typed properties, method return values,
# instance properties and static properties.  The `*CannotBeModified` tests
# verify that the runtime *freezes* collections it hands out — the kernel
# returns value snapshots, so mutating one locally would silently diverge
# from the JS-side state; a FrozenError makes that mistake loud instead.
# The collectionOfInterfaces_* quartet checks that *elements* of returned
# collections hydrate correctly whether they are structs (value objects,
# eagerly hydrated) or interfaces (live byref proxies that forward calls).
RSpec.describe 'JSII compliance: collections' do
  it 'sets and reads array and map properties', compliance: 'collectionTypes' do
    types = JsiiCalc::AllTypes.new

    # array
    types.array_property = ['Hello', 'World']
    expect(types.array_property[1]).to eq('World')

    # map
    map = { 'Foo' => Scope::JsiiCalcLib::Number.new(123) }
    types.map_property = map
    # The map returned should have the hydrated objects
    expect(types.map_property['Foo']).to be_a(Scope::JsiiCalcLib::Number)
    expect(types.map_property['Foo'].value).to eq(123)
  end

  it 'sets and reads arrays of host objects (Sum parts)', compliance: 'arrays' do
    sum = JsiiCalc::Sum.new
    sum.parts = [
      Scope::JsiiCalcLib::Number.new(5),
      Scope::JsiiCalcLib::Number.new(10),
      JsiiCalc::Multiply.new(Scope::JsiiCalcLib::Number.new(2), Scope::JsiiCalcLib::Number.new(3))
    ]

    expect(sum.value).to eq(5 + 10 + (2 * 3))
    expect(sum.parts[0].value).to eq(5)
    expect(sum.parts[2].value).to eq(6)
    expect(sum.to_string).to eq('(((0 + 5) + 10) + (2 * 3))')
  end

  it 'reads maps of host object lists (operations_map)', compliance: 'maps' do
    calc = JsiiCalc::Calculator.new
    calc.add(10)
    calc.add(20)
    calc.mul(2)

    expect(calc.operations_map['add'].length).to eq(2)
    expect(calc.operations_map['mul'].length).to eq(1)
    expect(calc.operations_map['add'][1].value).to eq(30)
  end

  it 'reads an array returned by a method', compliance: 'arrayReturnedByMethodCanBeRead' do
    list = JsiiCalc::ClassWithCollections.create_a_list()
    expect(list).to eq(['one', 'two'])
  end

  it 'freezes arrays returned by methods', compliance: 'arrayReturnedByMethodCannotBeModified' do
    list = JsiiCalc::ClassWithCollections.create_a_list()
    expect(list).to be_frozen
    expect { list << 'three' }.to raise_error(FrozenError)
  end

  it 'reads a map returned by a method', compliance: 'mapReturnedByMethodCanBeRead' do
    map = JsiiCalc::ClassWithCollections.create_a_map()
    expect(map).to eq({ 'key1' => 'value1', 'key2' => 'value2' })
  end

  it 'freezes maps returned by methods', compliance: 'mapReturnedByMethodCannotBeModified' do
    map = JsiiCalc::ClassWithCollections.create_a_map()
    expect(map).to be_frozen
    expect { map['keyThree'] = 'valueThree' }.to raise_error(FrozenError)
  end

  it 'reads an instance list property', compliance: 'listInClassCanBeReadCorrectly' do
    obj = JsiiCalc::ClassWithCollections.new({}, ['one', 'two'])
    expect(obj.array).to eq(['one', 'two'])
  end

  it 'reads an instance map property', compliance: 'mapInClassCanBeReadCorrectly' do
    obj = JsiiCalc::ClassWithCollections.new({ 'key1' => 'value1', 'key2' => 'value2' }, [])
    expect(obj.map).to eq({ 'key1' => 'value1', 'key2' => 'value2' })
  end

  it 'freezes instance map properties', compliance: 'mapInClassCannotBeModified' do
    obj = JsiiCalc::ClassWithCollections.new({ 'key' => 'value' }, [])
    expect(obj.map).to be_frozen
    expect { obj.map['keyTwo'] = 'valueTwo' }.to raise_error(FrozenError)
  end

  it 'reads a static list property', compliance: 'staticListInClassCanBeReadCorrectly' do
    expect(JsiiCalc::ClassWithCollections.static_array).to eq(['one', 'two'])
  end

  it 'freezes static list properties', compliance: 'staticListInClassCannotBeModified' do
    list = JsiiCalc::ClassWithCollections.static_array
    expect(list).to be_frozen
    expect { list << 'three' }.to raise_error(FrozenError)
  end

  it 'reads a static map property', compliance: 'staticMapInClassCanBeReadCorrectly' do
    map = JsiiCalc::ClassWithCollections.static_map
    expect(map).to eq({ 'key1' => 'value1', 'key2' => 'value2' })
  end

  it 'freezes static map properties', compliance: 'staticMapInClassCannotBeModified' do
    map = JsiiCalc::ClassWithCollections.static_map
    expect(map).to be_frozen
    expect { map['keyTwo'] = 'valueTwo' }.to raise_error(FrozenError)
  end

  describe 'collections of interfaces' do
    it 'hydrates a list of structs', compliance: 'collectionOfInterfaces_ListOfStructs' do
      JsiiCalc::InterfaceCollections.list_of_structs.each do |elt|
        expect(elt.required_string).not_to be_nil
      end
    end

    it 'hydrates a list of interfaces', compliance: 'collectionOfInterfaces_ListOfInterfaces' do
      JsiiCalc::InterfaceCollections.list_of_interfaces.each do |elt|
        expect(elt).to respond_to(:ring)
      end
    end

    it 'hydrates a map of structs', compliance: 'collectionOfInterfaces_MapOfStructs' do
      JsiiCalc::InterfaceCollections.map_of_structs.each_value do |elt|
        expect(elt.required_string).not_to be_nil
      end
    end

    it 'hydrates a map of interfaces', compliance: 'collectionOfInterfaces_MapOfInterfaces' do
      JsiiCalc::InterfaceCollections.map_of_interfaces.each_value do |elt|
        expect(elt).to respond_to(:ring)
      end
    end
  end
end
