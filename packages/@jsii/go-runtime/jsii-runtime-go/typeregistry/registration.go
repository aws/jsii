package typeregistry

import (
	"fmt"
	"reflect"

	"github.com/aws/jsii-runtime-go/api"
)

type typeKind uint8

const (
	_                      = iota
	classType     typeKind = iota
	enumType      typeKind = iota
	interfaceType typeKind = iota
	structType    typeKind = iota
)

type registeredType struct {
	Type reflect.Type
	Kind typeKind
}

// TypeRegisterer exposes the methods to register types with the jsii runtime
// for go.
type TypeRegisterer interface {
	// RegisterClass maps the given FQN to the provided class interface, list of
	// overrides, and proxy maker function. This returns an error if the class
	// type is not a go interface.
	RegisterClass(fqn api.FQN, class reflect.Type, overrides []api.Override, maker func() interface{}) error

	// RegisterEnum maps the given FQN to the provided enum type, and records the
	// provided members map (jsii member name => go value). This returns an error
	// if the provided enum is not a string derivative, or of any of the provided
	// member values has a type other than enm.
	RegisterEnum(fqn api.FQN, enm reflect.Type, members map[string]interface{}) error

	// RegisterInterface maps the given FQN to the provided interface type, list of
	// overrides, and proxy maker function. Returns an error if the provided interface
	// is not a go interface.
	RegisterInterface(fqn api.FQN, iface reflect.Type, overrides []api.Override, maker func() interface{}) error

	// RegisterStruct maps the given FQN to the provided struct type, and struct
	// interface. Returns an error if the provided struct type is not a go struct.
	RegisterStruct(fqn api.FQN, strct reflect.Type) error
}

// RegisterClass maps the given FQN to the provided class interface, list of
// overrides, and proxy maker function. This returns an error if the class
// type is not a go interface.
func (t *typeRegistry) RegisterClass(fqn api.FQN, class reflect.Type, overrides []api.Override, maker func() interface{}) error {
	if class.Kind() != reflect.Interface {
		return fmt.Errorf("the provided class is not an interface: %v", class)
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing.Type != class {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}

	t.fqnToType[fqn] = registeredType{class, classType}
	t.proxyMakers[class] = maker

	// Skipping registration if there are no members, as this would have no use.
	if len(overrides) > 0 {
		t.typeMembers[fqn] = append([]api.Override{}, overrides...)
	}

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
	if existing, exists := t.fqnToType[fqn]; exists && existing.Type != enm {
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

	t.fqnToType[fqn] = registeredType{enm, enumType}
	t.typeToEnumFQN[enm] = fqn
	for memberName, memberVal := range members {
		memberFQN := fmt.Sprintf("%s/%s", fqn, memberName)
		t.fqnToEnumMember[memberFQN] = memberVal
	}

	return nil
}

// RegisterInterface maps the given FQN to the provided interface type, list of
// overrides, and proxy maker function. Returns an error if the provided interface
// is not a go interface.
func (t *typeRegistry) RegisterInterface(fqn api.FQN, iface reflect.Type, overrides []api.Override, maker func() interface{}) error {
	if iface.Kind() != reflect.Interface {
		return fmt.Errorf("the provided interface is not an interface: %v", iface)
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing.Type != iface {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}

	t.fqnToType[fqn] = registeredType{iface, interfaceType}
	t.proxyMakers[iface] = maker

	// Skipping registration if there are no members, as this would have no use.
	if len(overrides) > 0 {
		t.typeMembers[fqn] = append([]api.Override{}, overrides...)
	}

	return nil
}

// RegisterStruct maps the given FQN to the provided struct type, and struct
// interface. Returns an error if the provided struct type is not a go struct,
// or the provided iface not a go interface.
func (t *typeRegistry) RegisterStruct(fqn api.FQN, strct reflect.Type) error {
	if strct.Kind() != reflect.Struct {
		return fmt.Errorf("the provided struct is not a struct: %v", strct)
	}

	if existing, exists := t.fqnToType[fqn]; exists && existing.Type != strct {
		return fmt.Errorf("another type was already registered with %s: %v", fqn, existing)
	}

	fields := []reflect.StructField{}
	numField := strct.NumField()
	for i := 0; i < numField; i++ {
		field := strct.Field(i)
		if field.Anonymous {
			return fmt.Errorf("unexpected anonymous field %v in struct %s (%v)", field, fqn, strct)
		}
		if field.PkgPath != "" {
			return fmt.Errorf("unexpected un-exported field %v in struct %s (%v)", field, fqn, strct)
		}
		if field.Tag.Get("json") == "" {
			return fmt.Errorf("missing json tag on struct field %v of %s (%v)", field, fqn, strct)
		}
		fields = append(fields, field)
	}

	t.fqnToType[fqn] = registeredType{strct, structType}
	t.structFields[strct] = fields

	return nil
}
