package typeregistry

import (
	"fmt"
	"reflect"

	"github.com/aws/jsii-runtime-go/api"
)

// TypeRegisterer exposes the methods to register types with the jsii runtime
// for go.
type TypeRegisterer interface {
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
}

// RegisterClass maps the given FQN to the provided class type, and interface
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

// RegisterEnum maps the given FQN to the provided enum type, and records the
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

// RegisterInterface maps the given FQN to the provided interface type, and
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

// RegisterStruct maps the given FQN to the provided struct type, and struct
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
