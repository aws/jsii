package jsii

import (
	"fmt"
	"reflect"
	"strings"

	"github.com/aws/jsii-runtime-go/internal/api"
	"github.com/aws/jsii-runtime-go/internal/kernel"
)

// FQN represents a fully-qualified type name in the jsii type system.
type FQN api.FQN

// Member is a runtime descriptor for a class or interface member
type Member interface {
	toOverride() api.Override
}

// MemberMethod is a runtime descriptor for a class method (implementation of Member)
type MemberMethod api.MethodOverride

func (m MemberMethod) toOverride() api.Override {
	return api.MethodOverride(m)
}

// MemberProperty is a runtime descriptor for a class or interface property (implementation of Member)
type MemberProperty api.PropertyOverride

func (m MemberProperty) toOverride() api.Override {
	return api.PropertyOverride(m)
}

// Load ensures a npm package is loaded in the jsii kernel.
func Load(name string, version string, tarball []byte) {
	c := kernel.GetClient()

	_, err := c.Load(kernel.LoadProps{
		Name:    name,
		Version: version,
	}, tarball)
	if err != nil {
		panic(err)
	}
}

// RegisterClass associates a class fully qualified name to the specified class
// interface, member list, and proxy maker function. Panics if class is not a go
// interface, or if the provided fqn was already used to register a different type.
func RegisterClass(fqn FQN, class reflect.Type, members []Member, maker func() interface{}) {
	client := kernel.GetClient()

	overrides := make([]api.Override, len(members))
	for i, m := range members {
		overrides[i] = m.toOverride()
	}

	if err := client.Types().RegisterClass(api.FQN(fqn), class, overrides, maker); err != nil {
		panic(err)
	}
}

// RegisterEnum associates an enum's fully qualified name to the specified enum
// type, and members. Panics if enum is not a reflect.String type, any value in
// the provided members map is of a type other than enum, or if the provided
// fqn was already used to register a different type.
func RegisterEnum(fqn FQN, enum reflect.Type, members map[string]interface{}) {
	client := kernel.GetClient()
	if err := client.Types().RegisterEnum(api.FQN(fqn), enum, members); err != nil {
		panic(err)
	}
}

// RegisterInterface associates an interface's fully qualified name to the
// specified interface type, member list, and proxy maker function. Panics if iface is not
// an interface, or if the provided fqn was already used to register a different type.
func RegisterInterface(fqn FQN, iface reflect.Type, members []Member, maker func() interface{}) {
	client := kernel.GetClient()

	overrides := make([]api.Override, len(members))
	for i, m := range members {
		overrides[i] = m.toOverride()
	}

	if err := client.Types().RegisterInterface(api.FQN(fqn), iface, overrides, maker); err != nil {
		panic(err)
	}
}

// RegisterStruct associates a struct's fully qualified name to the specified
// struct type. Panics if strct is not a struct, or if the provided fqn was
// already used to register a different type.
func RegisterStruct(fqn FQN, strct reflect.Type) {
	client := kernel.GetClient()
	if err := client.Types().RegisterStruct(api.FQN(fqn), strct); err != nil {
		panic(err)
	}
}

// InitJsiiProxy initializes a jsii proxy instance at the provided pointer.
// Panics if the pointer cannot be initialized to a proxy instance (i.e: the
// element of it is not a registered jsii interface or class type).
func InitJsiiProxy(ptr interface{}) {
	ptrVal := reflect.ValueOf(ptr).Elem()
	if err := kernel.GetClient().Types().InitJsiiProxy(ptrVal); err != nil {
		panic(err)
	}
}

// Create will construct a new JSII object within the kernel runtime. This is
// called by jsii object constructors.
func Create(fqn FQN, args []interface{}, inst interface{}) {
	client := kernel.GetClient()

	var overrides []api.Override

	instVal := reflect.ValueOf(inst)
	structVal := instVal.Elem()
	instType := structVal.Type()
	numField := instType.NumField()
	for i := 0; i < numField; i++ {
		field := instType.Field(i)
		if !field.Anonymous {
			continue
		}
		switch field.Type.Kind() {
		case reflect.Interface:
			fieldVal := structVal.Field(i)
			if !fieldVal.IsNil() {
				continue
			}
			if err := client.Types().InitJsiiProxy(fieldVal); err != nil {
				panic(err)
			}

			if tag := field.Tag.Get("overrides"); tag != "" {
				if names := strings.Split(tag, ","); len(names) > 0 {
					overrides = make([]api.Override, len(names))
					registry := client.Types()
					for i, name := range names {
						if override, ok := registry.GetOverride(api.FQN(fqn), name); !ok {
							panic(fmt.Errorf("unable to identify method or property for override %s declared by %v", name, field))
						} else {
							overrides[i] = override
						}
					}
				}
			}

		case reflect.Struct:
			fieldVal := structVal.Field(i)
			if !fieldVal.IsZero() {
				continue
			}
			if err := client.Types().InitJsiiProxy(fieldVal); err != nil {
				panic(err)
			}
		}
	}

	interfaces, newOverrides := client.Types().DiscoverImplementation(instType)
	overrides = append(overrides, newOverrides...)

	res, err := client.Create(kernel.CreateProps{
		FQN:        api.FQN(fqn),
		Arguments:  convertArguments(args),
		Interfaces: interfaces,
		Overrides:  overrides,
	})

	if err != nil {
		panic(err)
	}

	if err = client.RegisterInstance(instVal, res.InstanceID); err != nil {
		panic(err)
	}
}

// Invoke will call a method on a jsii class instance. The response will be
// decoded into the expected return type for the method being called.
func Invoke(obj interface{}, method string, args []interface{}, ret interface{}) {
	client := kernel.GetClient()

	// Find reference to class instance in client
	refid, found := client.FindObjectRef(reflect.ValueOf(obj))

	if !found {
		panic("No Object Found")
	}

	res, err := client.Invoke(kernel.InvokeProps{
		Method:    method,
		Arguments: convertArguments(args),
		ObjRef: api.ObjectRef{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	client.CastAndSetToPtr(ret, res.Result)
}

// InvokeVoid will call a void method on a jsii class instance.
func InvokeVoid(obj interface{}, method string, args []interface{}) {
	client := kernel.GetClient()

	// Find reference to class instance in client
	refid, found := client.FindObjectRef(reflect.ValueOf(obj))

	if !found {
		panic("No Object Found")
	}

	_, err := client.Invoke(kernel.InvokeProps{
		Method:    method,
		Arguments: convertArguments(args),
		ObjRef:    api.ObjectRef{InstanceID: refid},
	})

	if err != nil {
		panic(err)
	}
}

// StaticInvoke will call a static method on a given jsii class. The response
// will be decoded into the expected return type for the method being called.
func StaticInvoke(fqn FQN, method string, args []interface{}, ret interface{}) {
	client := kernel.GetClient()

	res, err := client.SInvoke(kernel.StaticInvokeProps{
		FQN:       api.FQN(fqn),
		Method:    method,
		Arguments: convertArguments(args),
	})

	if err != nil {
		panic(err)
	}

	client.CastAndSetToPtr(ret, res.Result)
}

// StaticInvokeVoid will call a static void method on a given jsii class.
func StaticInvokeVoid(fqn FQN, method string, args []interface{}) {
	client := kernel.GetClient()

	_, err := client.SInvoke(kernel.StaticInvokeProps{
		FQN:       api.FQN(fqn),
		Method:    method,
		Arguments: convertArguments(args),
	})

	if err != nil {
		panic(err)
	}
}

// Get reads a property value on a given jsii class instance. The response
// should be decoded into the expected type of the property being read.
func Get(obj interface{}, property string, ret interface{}) {
	client := kernel.GetClient()

	// Find reference to class instance in client
	refid, found := client.FindObjectRef(reflect.ValueOf(obj))

	if !found {
		panic(fmt.Errorf("no object reference found for %v", obj))
	}

	res, err := client.Get(kernel.GetProps{
		Property: property,
		ObjRef: api.ObjectRef{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	client.CastAndSetToPtr(ret, res.Value)
}

// StaticGet reads a static property value on a given jsii class. The response
// should be decoded into the expected type of the property being read.
func StaticGet(fqn FQN, property string, ret interface{}) {
	client := kernel.GetClient()

	res, err := client.SGet(kernel.StaticGetProps{
		FQN:      api.FQN(fqn),
		Property: property,
	})

	if err != nil {
		panic(err)
	}

	client.CastAndSetToPtr(ret, res.Value)
}

// Set writes a property on a given jsii class instance. The value should match
// the type of the property being written, or the jsii kernel will crash.
func Set(obj interface{}, property string, value interface{}) {
	client := kernel.GetClient()

	// Find reference to class instance in client
	refid, found := client.FindObjectRef(reflect.ValueOf(obj))

	if !found {
		panic("No Object Found")
	}

	_, err := client.Set(kernel.SetProps{
		Property: property,
		Value:    client.CastPtrToRef(reflect.ValueOf(value)),
		ObjRef: api.ObjectRef{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}
}

// StaticSet writes a static property on a given jsii class. The value should
// match the type of the property being written, or the jsii kernel will crash.
func StaticSet(fqn FQN, property string, value interface{}) {
	client := kernel.GetClient()

	_, err := client.SSet(kernel.StaticSetProps{
		FQN:      api.FQN(fqn),
		Property: property,
		Value:    client.CastPtrToRef(reflect.ValueOf(value)),
	})

	if err != nil {
		panic(err)
	}
}

// convertArguments turns an argument struct and produces a list of values
// ready for inclusion in an invoke or create request.
func convertArguments(args []interface{}) []interface{} {
	if len(args) == 0 {
		return nil
	}

	result := make([]interface{}, len(args))
	client := kernel.GetClient()
	for i, arg := range args {
		val := reflect.ValueOf(arg)
		result[i] = client.CastPtrToRef(val)
	}

	return result
}

// Close finalizes the runtime process, signalling the end of the execution to
// the jsii kernel process, and waiting for graceful termination. The best
// practice is to defer call thins at the beginning of the "main" function.
//
// If a jsii client is used *after* Close was called, a new jsii kernel process
// will be initialized, and Close should be called again to correctly finalize
// that, too. This behavior is intended for use in unit/integration tests.
func Close() {
	kernel.CloseClient()
}

// Helpers to store primitives and return pointers to them
func Bool(v bool) *bool         { return &v }
func Number(v float64) *float64 { return &v }
func String(v string) *string   { return &v }
