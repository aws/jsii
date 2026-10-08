package tests

import (
	"testing"

	"github.com/aws/jsii-runtime-go"
	calc "github.com/aws/jsii/jsii-calc/go/jsiicalc/v3"
	"github.com/stretchr/testify/require"
)

// The following tests used to be part of the jsii compliance suite but have
// been removed from it because they exercise behaviour that is specific to the
// Go binding rather than a cross-language compliance requirement. They are kept
// here as plain Go tests because they still verify real Go behaviour.

func TestStructs_nonOptionalequals(t *testing.T) {
	require := require.New(t)

	structA := calc.StableStruct{ReadonlyProperty: jsii.String("one")}
	structB := calc.StableStruct{ReadonlyProperty: jsii.String("one")}
	structC := calc.StableStruct{ReadonlyProperty: jsii.String("two")}
	require.Equal(structB, structA)
	require.NotEqual(structC, structA)
}

func TestStructs_multiplePropertiesEquals(t *testing.T) {
	require := require.New(t)

	structA := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("one"),
		FirstMidLevelProperty:  jsii.String("two"),
		SecondMidLevelProperty: jsii.String("three"),
		TopLevelProperty:       jsii.String("four"),
	}
	structB := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("one"),
		FirstMidLevelProperty:  jsii.String("two"),
		SecondMidLevelProperty: jsii.String("three"),
		TopLevelProperty:       jsii.String("four"),
	}
	structC := calc.DiamondInheritanceTopLevelStruct{
		BaseLevelProperty:      jsii.String("one"),
		FirstMidLevelProperty:  jsii.String("two"),
		SecondMidLevelProperty: jsii.String("different"),
		TopLevelProperty:       jsii.String("four"),
	}

	require.Equal(structA, structB)
	require.NotEqual(structA, structC)
}

func TestEqualsIsResistantToPropertyShadowingResultVariable(t *testing.T) {
	require := require.New(t)

	first := calc.StructWithJavaReservedWords{Default: jsii.String("one")}
	second := calc.StructWithJavaReservedWords{Default: jsii.String("one")}
	third := calc.StructWithJavaReservedWords{Default: jsii.String("two")}
	require.Equal(first, second)
	require.NotEqual(first, third)
}

func TestUnionPropertiesWithBuilder(t *testing.T) {
	require := require.New(t)

	obj1 := calc.UnionProperties{Bar: 12, Foo: "Hello"}
	require.Equal(12, obj1.Bar)
	require.Equal("Hello", obj1.Foo)

	obj2 := calc.UnionProperties{Bar: "BarIsString"}
	require.Equal("BarIsString", obj2.Bar)
	require.Empty(obj2.Foo)

	allTypes := calc.NewAllTypes()
	obj3 := calc.UnionProperties{Bar: allTypes, Foo: 999}
	require.Same(allTypes, obj3.Bar)
	require.Equal(999, obj3.Foo)
}

func TestCanObtainStructReferenceWithOverloadedSetter(t *testing.T) {
	require := require.New(t)
	require.NotNil(calc.ConfusingToJackson_MakeStructInstance())
}

func TestInterfaceBuilder(t *testing.T) {
	require := require.New(t)

	interact := calc.NewUsesInterfaceWithProperties(&interfaceBuilderIInterfaceWithProperties{value: jsii.String("READ_WRITE")})
	require.Equal("READ_ONLY", *interact.JustRead())

	require.Equal("Hello", *interact.WriteAndRead(jsii.String("Hello")))
}

type interfaceBuilderIInterfaceWithProperties struct {
	value *string
}

func (i *interfaceBuilderIInterfaceWithProperties) ReadOnlyString() *string {
	return jsii.String("READ_ONLY")
}

func (i *interfaceBuilderIInterfaceWithProperties) ReadWriteString() *string {
	return i.value
}

func (i *interfaceBuilderIInterfaceWithProperties) SetReadWriteString(val *string) {
	i.value = val
}

func TestDoNotOverridePrivates_Method_Private(t *testing.T) {
	require := require.New(t)

	obj := &doNotOverridePrivatesMethodPrivate{
		DoNotOverridePrivates: calc.NewDoNotOverridePrivates(),
	}

	require.Equal("privateMethod", *obj.PrivateMethodValue())
}

type doNotOverridePrivatesMethodPrivate struct {
	calc.DoNotOverridePrivates
}

func (d *doNotOverridePrivatesMethodPrivate) privateMethod() string {
	return "privateMethod-Override"
}

func TestDoNotOverridePrivates_property_getter_private(t *testing.T) {
	require := require.New(t)

	obj := doNotOverridePrivatesPropertyGetterPrivate{calc.NewDoNotOverridePrivates()}
	require.Equal("privateProperty", *obj.PrivatePropertyValue())

	// verify the setter override is not invoked.
	obj.ChangePrivatePropertyValue(jsii.String("MyNewValue"))
	require.Equal("MyNewValue", *obj.PrivatePropertyValue())
}

type doNotOverridePrivatesPropertyGetterPrivate struct {
	calc.DoNotOverridePrivates
}

func (s *doNotOverridePrivatesPropertyGetterPrivate) PrivateProperty() string {
	return "privateProperty-Override"
}

func (s *doNotOverridePrivatesPropertyGetterPrivate) SetPrivateProperty(value string) {
	panic("Boom")
}

func TestDoNotOverridePrivates_Property_By_Name_Private(t *testing.T) {
	require := require.New(t)

	obj := doNotOverridePrivatesPropertyByNamePrivate{calc.NewDoNotOverridePrivates()}
	require.Equal("privateProperty", *obj.PrivatePropertyValue())
}

type doNotOverridePrivatesPropertyByNamePrivate struct {
	calc.DoNotOverridePrivates
}

func (s *doNotOverridePrivatesPropertyByNamePrivate) PrivateProperty() string {
	return "privateProperty-Override"
}
