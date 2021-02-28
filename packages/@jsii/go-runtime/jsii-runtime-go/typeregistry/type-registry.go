package typeregistry

import (
	"fmt"
	"reflect"

	"github.com/aws/jsii-runtime-go/api"
)

// TypeRegistry exposes the methods to register types with the jsii runtime for
// go as well as methods to work with registered types.
type TypeRegistry interface {
	TypeRegisterer

	// StructFields returns the list of fields that make a registered jsii struct.
	StructFields(typ reflect.Type) (fields []reflect.StructField, found bool)

	// InitJsiiProxy initializes a jsii proxy value at the provided pointer. It
	// returns an error if the pointer does not have a value of a registered
	// proxyable type (that is, a class or interface type).
	InitJsiiProxy(val reflect.Value) error

	// EnumMemberForEnumRef returns the go enum member corresponding to a jsii fully
	// qualified enum member name (e.g: "jsii-calc.StringEnum/A"). If no enum member
	// was registered (via registerEnum) for the provided enumref, an error is
	// returned.
	EnumMemberForEnumRef(ref api.EnumRef) (interface{}, error)

	// TryRenderEnumRef returns an enumref if the provided value corresponds to a
	// registered enum type. The returned enumref is nil if the provided enum value
	// is a zero-value (i.e: "").
	TryRenderEnumRef(value reflect.Value) (ref *api.EnumRef, isEnumRef bool)
}

// typeRegistry is used to record runtime type information about the loaded
// modules, which is later used to correctly convert objects received from the
// JavaScript process into native go values.
type typeRegistry struct {
	// fqnToType is used to obtain the native go type for a given jsii fully
	// qualified type name. The kind of type being returned depends on what the
	// FQN represents... This will be the second argument of provided to a
	// register* function.
	// enums are not included
	fqnToType map[api.FQN]reflect.Type

	// map enum member FQNs (e.g. "jsii-calc.StringEnum/A") to the corresponding
	// go const for this member.
	fqnToEnumMember map[string]interface{}

	// maps Go enum type ("StringEnum") to the corresponding jsii enum FQN (e.g.
	// "jsii-calc.StringEnum")
	typeToEnumFQN map[reflect.Type]api.FQN

	// maps registered struct types to all their fields.
	structFields map[reflect.Type][]reflect.StructField

	// map registered interface types to a proxy maker function
	proxyMakers map[reflect.Type]func() interface{}
}

// NewTypeRegistry creates a new type registry.
func NewTypeRegistry() TypeRegistry {
	return &typeRegistry{
		fqnToType:       make(map[api.FQN]reflect.Type),
		fqnToEnumMember: make(map[string]interface{}),
		typeToEnumFQN:   make(map[reflect.Type]api.FQN),
		structFields:    make(map[reflect.Type][]reflect.StructField),
		proxyMakers:     make(map[reflect.Type]func() interface{}),
	}
}

// IsStruct returns true if the provided type is a registered jsii struct.
func (t *typeRegistry) StructFields(typ reflect.Type) (fields []reflect.StructField, ok bool) {
	var found []reflect.StructField
	found, ok = t.structFields[typ]
	if ok {
		// Returning a copy, to ensure our storage does not get mutated.
		fields = append(fields, found...)
	}
	return
}

// InitJsiiProxy initializes a jsii proxy value at the provided pointer. It
// returns an error if the pointer does not have a value of a registered
// proxyable type (that is, a class or interface type).
func (t *typeRegistry) InitJsiiProxy(val reflect.Value) error {
	valType := val.Type()

	switch valType.Kind() {
	case reflect.Interface:
		if maker, ok := t.proxyMakers[valType]; ok {
			made := maker()
			val.Set(reflect.ValueOf(made))
			return nil
		}
		return fmt.Errorf("unable to make an instance of unregistered interface %v", valType)

	case reflect.Struct:
		if !val.IsZero() {
			return fmt.Errorf("refusing to initialize non-zero-value struct %v", val)
		}
		numField := valType.NumField()
		for i := 0; i < numField; i++ {
			field := valType.Field(i)
			if field.Name == "_" {
				// Ignore any padding
				continue
			}
			if !field.Anonymous {
				return fmt.Errorf("refusing to initialize non-anonymous field %s of %v", field.Name, val)
			}
			if err := t.InitJsiiProxy(val.Field(i)); err != nil {
				return err
			}
		}
		return nil

	default:
		return fmt.Errorf("unable to make an instance of %v (neither a struct nor interface)", valType)
	}
}

// EnumMemberForEnumRef returns the go enum member corresponding to a jsii fully
// qualified enum member name (e.g: "jsii-calc.StringEnum/A"). If no enum member
// was registered (via registerEnum) for the provided enumref, an error is
// returned.
func (t *typeRegistry) EnumMemberForEnumRef(ref api.EnumRef) (interface{}, error) {
	if member, ok := t.fqnToEnumMember[ref.MemberFQN]; ok {
		return member, nil
	}
	return nil, fmt.Errorf("no enum member registered for %s", ref.MemberFQN)
}

// TryRenderEnumRef returns an enumref if the provided value corresponds to a
// registered enum type. The returned enumref is nil if the provided enum value
// is a zero-value (i.e: "").
func (t *typeRegistry) TryRenderEnumRef(value reflect.Value) (ref *api.EnumRef, isEnumRef bool) {
	if value.Kind() != reflect.String {
		isEnumRef = false
		return
	}

	if enumFQN, ok := t.typeToEnumFQN[value.Type()]; ok {
		isEnumRef = true
		if memberName := value.String(); memberName != "" {
			ref = &api.EnumRef{MemberFQN: fmt.Sprintf("%s/%s", enumFQN, memberName)}
		} else {
			ref = nil
		}
	} else {
		isEnumRef = false
	}

	return
}
