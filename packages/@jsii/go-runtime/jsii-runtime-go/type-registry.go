package jsii

import (
	"fmt"
	"reflect"
)

// typeRegistry is used to record runtime type information about the loaded
// modules, which is later used to correctly convert objects received from the
// JavaScript process into native go values.
type typeRegistry struct {
	// fqnToType is used to obtain the native go type for a given jsii fully
	// qualified type name. The kind of type being returned depends on what the
	// FQN represents... This will be the second argument of provided to a
	// register* function.
	// enums are not included
	fqnToType map[FQN]reflect.Type

	// ifaceToStruct provides the go struct that should be used to build a proxy
	// for interface types, so the correct dynamic type can be returned from a
	// conversion.
	ifaceToStruct map[reflect.Type]reflect.Type

	// map enum member FQNs (e.g. "jsii-calc.StringEnum/A") to the corresponding
	// go const for this member.
	fqnToEnumMember map[string]interface{}

	// maps Go enum type ("StringEnum") to the corresponding jsii enum FQN (e.g.
	// "jsii-calc.StringEnum")
	typeToEnumFqn map[reflect.Type]FQN
}

// newTypeRegistry creates a new type registry.
func newTypeRegistry() *typeRegistry {
	return &typeRegistry{
		fqnToType:       make(map[FQN]reflect.Type),
		ifaceToStruct:   make(map[reflect.Type]reflect.Type),
		fqnToEnumMember: make(map[string]interface{}),
		typeToEnumFqn:   make(map[reflect.Type]FQN),
	}
}

// registerClass maps the given FQN to the provided class type, and interface
// type. This returns an error if the class type is not a go struct, or if the
// interface type is not a go interface.
func (t *typeRegistry) registerClass(fqn FQN, class reflect.Type, iface reflect.Type) error {
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
func (t *typeRegistry) registerEnum(fqn FQN, enm reflect.Type, members map[string]interface{}) error {
	if enm.Kind() != reflect.String {
		return fmt.Errorf("the provided enum is not a string derivative: %v", enm)
	}

	for memberName, memberVal := range members {
		vt := reflect.ValueOf(memberVal).Type()
		if vt != enm {
			return fmt.Errorf("the enum entry for key %s has incorrect type %v", memberName, vt)
		}

		memberFqn := fmt.Sprintf("%s/%s", fqn, memberName)
		t.fqnToEnumMember[memberFqn] = memberVal
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing != enm {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}

	t.typeToEnumFqn[enm] = fqn
	return nil
}

// registerInterface maps the given FQN to the provided interface type, and
// proxy struct. Returns an error if the provided interface is not a go
// interface, or the provided proxy type not a go struct.
func (t *typeRegistry) registerInterface(fqn FQN, iface reflect.Type, proxy reflect.Type) error {
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
func (t *typeRegistry) registerStruct(fqn FQN, strct reflect.Type, iface reflect.Type) error {
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
func (t *typeRegistry) concreteTypeFor(typ reflect.Type) (structType reflect.Type, err error) {
	if typ.Kind() == reflect.Struct {
		structType = typ
		err = nil
	} else if typ.Kind() == reflect.Interface {
		var ok bool
		structType, ok = t.ifaceToStruct[typ]
		if !ok {
			err = fmt.Errorf("no concrete type was registered for interface: %v", typ)
		}
	} else {
		err = fmt.Errorf("invalid argument: expected a struct or interface type, but got %v", typ)
	}
	return
}

func (t *typeRegistry) enumMemberForEnumRef(ref enumref) (interface{}, error) {
	member, ok := t.fqnToEnumMember[ref.MemberFQN]
	if !ok {
		return nil, fmt.Errorf("no enum member registered for %s", ref.MemberFQN)
	}

	return member, nil
}

func (t *typeRegistry) tryRenderEnumRef(value reflect.Value) (ref *enumref, isEnumRef bool) {
	if value.Kind() != reflect.String {
		isEnumRef = false
		return
	}

	enumFqn, ok := t.typeToEnumFqn[value.Type()]
	if !ok {
		isEnumRef = false
		return
	}

	isEnumRef = true

	if memberName := value.String(); memberName != "" {
		ref = &enumref{MemberFQN: fmt.Sprintf("%s/%s", enumFqn, memberName)}
	} else {
		ref = nil
	}
	return
}
