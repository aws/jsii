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
	fqnToType map[FQN]reflect.Type

	// ifaceToStruct provides the go struct that should be used to build a proxy
	// for interface types, so the correct dynamic type can be returned from a
	// conversion.
	ifaceToStruct map[reflect.Type]reflect.Type

	// enumMembers has enum constants for each registered enum type, supporting
	// correct conversion of enum values received from JavaScript.
	enumMembers map[reflect.Type]map[string]interface{}
}

// newTypeRegistry creates a new type registry.
func newTypeRegistry() *typeRegistry {
	return &typeRegistry{
		fqnToType:     make(map[FQN]reflect.Type),
		ifaceToStruct: make(map[reflect.Type]reflect.Type),
		enumMembers:   make(map[reflect.Type]map[string]interface{}),
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

	for k, v := range members {
		vt := reflect.ValueOf(v).Type()
		if vt != enm {
			return fmt.Errorf("the enum entry for key %s has incorrect type %v", k, vt)
		}
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing != enm {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}

	t.fqnToType[fqn] = enm
	t.enumMembers[enm] = members

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
