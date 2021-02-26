package objectstore

import (
	"fmt"
	"reflect"
)

// ObjectStore tracks object instances for which an identifier
// has been associated.
type ObjectStore interface {
	// Register adds a new value to this ObjectStore, with the given
	// instanceID. An error will be returned if the value is not
	// addressable (meaning if is not already a reflect.Ptr, and
	// value.CanAddr() returns false), if it was already registered
	// with a different instanceID, or if the provided instanceID has
	// already be used by another value.
	//
	// All anonymous embedded fields will be registered as aliases
	// with the same instanceID (so that InstanceID returns the wrapper
	// object's instanceID correctly (ensuring jsii proxies can properly
	// trigger inherited method calls).
	Register(value reflect.Value, instanceID string) error

	// InstanceID returns the instanceID associated with a given object,
	// if any exists. Always returns false if the provided value is not
	// valid through the Register call.
	InstanceID(value reflect.Value) (instanceID string, found bool)

	// GetObject returns the value associated with the provided instanceID,
	// if any.
	GetObject(instanceID string) (value reflect.Value, found bool)
}

type objectStore struct {
	objectToID map[uintptr]string
	idToObject map[string]reflect.Value
}

// NewObjectStore initializes a new ObjectStore value.
func NewObjectStore() ObjectStore {
	return &objectStore{
		objectToID: make(map[uintptr]string),
		idToObject: make(map[string]reflect.Value),
	}
}

func (o *objectStore) Register(value reflect.Value, instanceID string) error {
	var err error
	if value, err = canonicalValue(value); err != nil {
		return err
	}
	ptr := value.Pointer()

	if existing, found := o.objectToID[ptr]; found {
		if existing == instanceID {
			return nil
		}
		return fmt.Errorf("attempting to register %v as %s, but it was already registered as %s", value, instanceID, existing)
	}
	if existing, found := o.idToObject[instanceID]; found {
		if existing == value {
			return nil
		}
		return fmt.Errorf("attempted to register %v as %s, but %v has this ID", value, instanceID, existing)
	}

	aliases := findAliases(value)
	for _, alias := range aliases {
		ptr := alias.Pointer()
		if existing, found := o.objectToID[ptr]; found && existing != instanceID {
			return fmt.Errorf("value %s is embedded in %s which has ID %s, but was already assigned %s", alias, value, instanceID, existing)
		}
	}

	o.objectToID[ptr] = instanceID
	o.idToObject[instanceID] = value
	for _, alias := range aliases {
		o.objectToID[alias.Pointer()] = instanceID
	}

	return nil
}

func (o *objectStore) InstanceID(value reflect.Value) (instanceID string, found bool) {
	var err error
	if value, err = canonicalValue(value); err == nil {
		ptr := value.Pointer()
		instanceID, found = o.objectToID[ptr]
	}
	return
}

func (o *objectStore) GetObject(instanceID string) (value reflect.Value, found bool) {
	value, found = o.idToObject[instanceID]
	return
}

// canonicalValue ensures the same reference is always considered
// for object identity (especially in maps), so that we don't get
// surprised by pointer to struct versus struct value versus opaque
// interface value, etc...
func canonicalValue(value reflect.Value) (reflect.Value, error) {
	if value.Kind() == reflect.Ptr && value.Elem().Kind() == reflect.Struct {
		return value, nil
	}
	// If this is a pointer to something, de-references it.
	result := reflect.ValueOf(reflect.Indirect(value).Interface())

	if result.Kind() != reflect.Ptr {
		return reflect.Value{}, fmt.Errorf("illegal argument: %s is not a pointer", result.String())
	}

	return result, nil
}

func findAliases(value reflect.Value) []reflect.Value {
	result := []reflect.Value{}

	// Indirect so we always work on the pointer referree
	value = reflect.Indirect(value)

	t := value.Type()
	numField := t.NumField()
	for i := 0; i < numField; i++ {
		f := t.Field(i)

		// Ignore non-anonymous fields (including padding)
		if !f.Anonymous {
			continue
		}

		fv := value.FieldByIndex(f.Index)
		if fv.Kind() == reflect.Interface {
			// If an interface, de-reference to get to the struct type.
			fv = reflect.ValueOf(fv.Interface())
		}
		if fv.Kind() == reflect.Struct {
			// If a struct, get the address of the member.
			fv = fv.Addr()
		}

		result = append(result, fv)
		// Recurse down to collect nested aliases
		result = append(result, findAliases(fv)...)
	}

	return result
}
