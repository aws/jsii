package jsii

import (
	"fmt"
	"reflect"
)

type typeRegistry struct {
	fqnToType     map[FQN]reflect.Type
	ifaceToStruct map[reflect.Type]reflect.Type
	enumMembers   map[reflect.Type]map[string]interface{}
}

func newTypeRegistry() *typeRegistry {
	return &typeRegistry{
		fqnToType:     make(map[FQN]reflect.Type),
		ifaceToStruct: make(map[reflect.Type]reflect.Type),
		enumMembers:   make(map[reflect.Type]map[string]interface{}),
	}
}

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

func (t *typeRegistry) concreteTypeFor(typ reflect.Type) (structType reflect.Type, ok bool) {
	if typ.Kind() == reflect.Struct {
		structType = typ
		ok = true
	} else if typ.Kind() == reflect.Interface {
		structType, ok = t.ifaceToStruct[typ]
	} else {
		ok = false
	}
	return
}
