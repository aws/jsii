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

	// ConcreteTypeFor returns the concrete implementation of the provided struct
	// or interface type. If typ is a struct, returns typ without futher effort. If
	// it is an interface, returns the struct associated to this interface type.
	// Returns an error if the argument is an interface, and no struct was
	// registered for it using registerClass, registerInterface or registerStruct.
	ConcreteTypeFor(typ reflect.Type) (structType reflect.Type, err error)

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

	// ifaceToStruct provides the go struct that should be used to build a proxy
	// for interface types, so the correct dynamic type can be returned from a
	// conversion.
	ifaceToStruct map[reflect.Type]reflect.Type

	// map enum member FQNs (e.g. "jsii-calc.StringEnum/A") to the corresponding
	// go const for this member.
	fqnToEnumMember map[string]interface{}

	// maps Go enum type ("StringEnum") to the corresponding jsii enum FQN (e.g.
	// "jsii-calc.StringEnum")
	typeToEnumFQN map[reflect.Type]api.FQN
}

// NewTypeRegistry creates a new type registry.
func NewTypeRegistry() TypeRegistry {
	return &typeRegistry{
		fqnToType:       make(map[api.FQN]reflect.Type),
		ifaceToStruct:   make(map[reflect.Type]reflect.Type),
		fqnToEnumMember: make(map[string]interface{}),
		typeToEnumFQN:   make(map[reflect.Type]api.FQN),
	}
}

// concreteTypeFor returns the concrete implementation of the provided struct
// or interface type. If typ is a struct, returns typ without futher effort. If
// it is an interface, returns the struct associated to this interface type.
// Returns an error if the argument is an interface, and no struct was
// registered for it using registerClass, registerInterface or registerStruct.
func (t *typeRegistry) ConcreteTypeFor(typ reflect.Type) (structType reflect.Type, err error) {
	if typ.Kind() == reflect.Struct {
		structType = typ
		err = nil
	} else if typ.Kind() == reflect.Interface {
		var ok bool
		if structType, ok = t.ifaceToStruct[typ]; !ok {
			err = fmt.Errorf("no concrete type was registered for interface: %v", typ)
		}
	} else {
		err = fmt.Errorf("invalid argument: expected a struct or interface type, but got %v", typ)
	}
	return
}

// enumMemberForEnumRef returns the go enum member corresponding to a jsii fully
// qualified enum member name (e.g: "jsii-calc.StringEnum/A"). If no enum member
// was registered (via registerEnum) for the provided enumref, an error is
// returned.
func (t *typeRegistry) EnumMemberForEnumRef(ref api.EnumRef) (interface{}, error) {
	if member, ok := t.fqnToEnumMember[ref.MemberFQN]; ok {
		return member, nil
	}
	return nil, fmt.Errorf("no enum member registered for %s", ref.MemberFQN)
}

// tryRenderEnumRef returns an enumref if the provided value corresponds to a
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
