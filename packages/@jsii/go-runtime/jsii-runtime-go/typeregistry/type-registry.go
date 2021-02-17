package typeregistry

import (
	"fmt"
	"reflect"

	"github.com/aws/jsii-runtime-go/api"
)

type TypeRegistry interface {
	// RegisterClass maps the given FQN to the provided class type, and interface
	// type. This returns an error if the class type is not a go struct, or if the
	// interface type is not a go interface.
	RegisterClass(fqn api.FQN, class reflect.Type, iface reflect.Type) error

	// RegisterEnum maps the given FQN to the provided enum type, and records the
	// provided members map (jsii member name => go value). This returns an error
	// if the provided enum is not a string derivative, or of any of the provided
	// member values has a type other than enm.
	RegisterEnum(fqn api.FQN, enm reflect.Type, members map[string]interface{}) error

	// RegisterInterface maps the given FQN to the provided interface type, and
	// proxy struct. Returns an error if the provided interface is not a go
	// interface, or the provided proxy type not a go struct.
	RegisterInterface(fqn api.FQN, iface reflect.Type, proxy reflect.Type) error

	// RegisterStruct maps the given FQN to the provided struct type, and struct
	// interface. Returns an error if the provided struct type is not a go struct,
	// or the provided iface not a go interface.
	RegisterStruct(fqn api.FQN, strct reflect.Type, iface reflect.Type) error

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

// newTypeRegistry creates a new type registry.
func NewTypeRegistry() TypeRegistry {
	return &typeRegistry{
		fqnToType:       make(map[api.FQN]reflect.Type),
		ifaceToStruct:   make(map[reflect.Type]reflect.Type),
		fqnToEnumMember: make(map[string]interface{}),
		typeToEnumFQN:   make(map[reflect.Type]api.FQN),
	}
}

// registerClass maps the given FQN to the provided class type, and interface
// type. This returns an error if the class type is not a go struct, or if the
// interface type is not a go interface.
func (t *typeRegistry) RegisterClass(fqn api.FQN, class reflect.Type, iface reflect.Type) error {
	if class.Kind() != reflect.Struct {
		return fmt.Errorf("the provided class is not a struct: %v", class)
	}
	if iface.Kind() != reflect.Interface {
		return fmt.Errorf("the provided interface is not an interface: %v", iface)
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing != class {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}
	if existing, exists := t.ifaceToStruct[iface]; exists && existing != class {
		return fmt.Errorf("another struct was already registered with %v: %v", iface, existing)
	}

	t.fqnToType[fqn] = class
	t.ifaceToStruct[iface] = class

	return nil
}

// registerEnum maps the given FQN to the provided enum type, and records the
// provided members map (jsii member name => go value). This returns an error
// if the provided enum is not a string derivative, or of any of the provided
// member values has a type other than enm.
func (t *typeRegistry) RegisterEnum(fqn api.FQN, enm reflect.Type, members map[string]interface{}) error {
	if enm.Kind() != reflect.String {
		return fmt.Errorf("the provided enum is not a string derivative: %v", enm)
	}
	if existing, exists := t.fqnToType[fqn]; exists && existing != enm {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}
	for memberName, memberVal := range members {
		vt := reflect.ValueOf(memberVal).Type()
		if vt != enm {
			return fmt.Errorf("the enum entry for key %s has incorrect type %v", memberName, vt)
		}
		// Not setting in t.fqnToEnumMember here so we don't cause any side-effects
		// if the pre-condition fails at any point. This is done in a second loop.
	}

	t.typeToEnumFQN[enm] = fqn
	for memberName, memberVal := range members {
		memberFQN := fmt.Sprintf("%s/%s", fqn, memberName)
		t.fqnToEnumMember[memberFQN] = memberVal
	}

	return nil
}

// registerInterface maps the given FQN to the provided interface type, and
// proxy struct. Returns an error if the provided interface is not a go
// interface, or the provided proxy type not a go struct.
func (t *typeRegistry) RegisterInterface(fqn api.FQN, iface reflect.Type, proxy reflect.Type) error {
	if iface.Kind() != reflect.Interface {
		return fmt.Errorf("the provided interface is not an interface: %v", iface)
	}
	if proxy.Kind() != reflect.Struct {
		return fmt.Errorf("the provided proxy is not a struct: %v", proxy)
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing != iface {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}
	if existing, exists := t.ifaceToStruct[iface]; exists && existing != proxy {
		return fmt.Errorf("another struct was already registered with %v: %v", iface, existing)
	}

	t.fqnToType[fqn] = iface
	t.ifaceToStruct[iface] = proxy

	return nil
}

// registerStruct maps the given FQN to the provided struct type, and struct
// interface. Returns an error if the provided struct type is not a go struct,
// or the provided iface not a go interface.
func (t *typeRegistry) RegisterStruct(fqn api.FQN, strct reflect.Type, iface reflect.Type) error {
	if strct.Kind() != reflect.Struct {
		return fmt.Errorf("the provided struct is not a struct: %v", strct)
	}
	if iface.Kind() != reflect.Interface {
		return fmt.Errorf("the provided interface is not an interface: %v", iface)
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing != strct {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}
	if existing, exists := t.ifaceToStruct[iface]; exists && existing != strct {
		return fmt.Errorf("another struct was already registered with %v: %v", iface, existing)
	}

	t.fqnToType[fqn] = strct
	t.ifaceToStruct[iface] = strct

	return nil
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
