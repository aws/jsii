package jsii

import (
	"fmt"
	"io/ioutil"
	"os"
	"reflect"
	"regexp"

	"github.com/aws/jsii-runtime-go/api"
	"github.com/aws/jsii-runtime-go/kernel"
)

// FQN represents a fully-qualified type name in the jsii type system.
type FQN api.FQN

type Override api.Override
type MethodOverride api.MethodOverride
type PropertyOverride api.PropertyOverride

// Load ensures a npm package is loaded in the jsii kernel.
func Load(name string, version string, tarball []byte) {
	c := kernel.GetClient()

	tmpfile, err := ioutil.TempFile("", fmt.Sprintf(
		"%s-%s.*.tgz",
		regexp.MustCompile("[^a-zA-Z0-9_-]").ReplaceAllString(name, "-"),
		version,
	))
	if err != nil {
		panic(err)
	}
	defer os.Remove(tmpfile.Name())
	if _, err := tmpfile.Write(tarball); err != nil {
		panic(err)
	}
	tmpfile.Close()

	_, err = c.Load(kernel.LoadRequest{
		API:     "load",
		Name:    name,
		Version: version,
		Tarball: tmpfile.Name(),
	})
	if err != nil {
		panic(err)
	}
}

// RegisterClass associates a class fully qualified name to the specified class
// interface, and proxy struct. Panics if class is not an go interface, proxy is
// not a go struct, or if the provided fqn was already used to register a different
// type.
func RegisterClass(fqn FQN, class reflect.Type, maker func() interface{}) {
	client := kernel.GetClient()
	if err := client.Types().RegisterClass(api.FQN(fqn), class, maker); err != nil {
		panic(err)
	}
}

// RegisterEnum associates an enum's fully qualified name to the specified enum
// type, and members. Panics if enum is not a reflect.String type, any value in
// the provided members map is of a type ofther than enum, or if the provided
// fqn was already used to register a different type.
func RegisterEnum(fqn FQN, enum reflect.Type, members map[string]interface{}) {
	client := kernel.GetClient()
	if err := client.Types().RegisterEnum(api.FQN(fqn), enum, members); err != nil {
		panic(err)
	}
}

// RegisterInterface associates an interface's fully qualified name to the
// specified interface type, and proxy maker function. Panics if iface is not an
// interface, or if the provided fqn was already used to register a different type.
func RegisterInterface(fqn FQN, iface reflect.Type, maker func() interface{}) {
	client := kernel.GetClient()
	if err := client.Types().RegisterInterface(api.FQN(fqn), iface, maker); err != nil {
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
func Create(fqn FQN, args []interface{}, interfaces []FQN, overrides []Override, inst interface{}) {
	client := kernel.GetClient()

	instVal := reflect.ValueOf(inst).Elem()
	instType := instVal.Type()
	numField := instType.NumField()
	for i := 0; i < numField; i++ {
		field := instType.Field(i)
		if !field.Anonymous {
			continue
		}
		switch field.Type.Kind() {
		case reflect.Interface:
			fieldVal := instVal.Field(i)
			if !fieldVal.IsNil() {
				continue
			}
			if err := client.Types().InitJsiiProxy(fieldVal); err != nil {
				panic(err)
			}

		case reflect.Struct:
			fieldVal := instVal.Field(i)
			if !fieldVal.IsZero() {
				continue
			}
			if err := client.Types().InitJsiiProxy(fieldVal); err != nil {
				panic(err)
			}
		}
	}

	var interfaceFQNs []api.FQN
	for _, iface := range interfaces {
		interfaceFQNs = append(interfaceFQNs, api.FQN(iface))
	}
	var apiOverrides []api.Override
	for _, override := range overrides {
		apiOverrides = append(apiOverrides, override)
	}

	res, err := client.Create(kernel.CreateRequest{
		API:        "create",
		FQN:        api.FQN(fqn),
		Arguments:  castPtrsToRef(args),
		Interfaces: interfaceFQNs,
		Overrides:  apiOverrides,
	})

	if err != nil {
		panic(err)
	}

	if err = client.RegisterInstance(instVal, res.InstanceID); err != nil {
		panic(err)
	}
}

// Invoke will call a method on a jsii class instance. The response should be
// decoded into the expected return type for the method being called.
func Invoke(obj interface{}, method string, args []interface{}, hasReturn bool, ret interface{}) {
	client := kernel.GetClient()

	// Find reference to class instance in client
	refid, found := client.FindObjectRef(reflect.ValueOf(obj))

	if !found {
		panic("No Object Found")
	}

	res, err := client.Invoke(kernel.InvokeRequest{
		API:       "invoke",
		Method:    method,
		Arguments: castPtrsToRef(args),
		ObjRef: api.ObjectRef{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	if hasReturn {
		client.CastAndSetToPtr(ret, res.Result)
	}
}

// StaticInvoke will call a static method on a given jsii class. The response
// should be decoded into the expected return type for the method being called.
func StaticInvoke(fqn FQN, method string, args []interface{}, hasReturn bool, ret interface{}) {
	client := kernel.GetClient()

	res, err := client.SInvoke(kernel.StaticInvokeRequest{
		API:       "sinvoke",
		FQN:       api.FQN(fqn),
		Method:    method,
		Arguments: castPtrsToRef(args),
	})

	if err != nil {
		panic(err)
	}

	if hasReturn {
		client.CastAndSetToPtr(ret, res.Result)
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

	res, err := client.Get(kernel.GetRequest{
		API:      "get",
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

	res, err := client.SGet(kernel.StaticGetRequest{
		API:      "sget",
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

	_, err := client.Set(kernel.SetRequest{
		API:      "set",
		Property: property,
		Value:    castPtrToRef(value),
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

	_, err := client.SSet(kernel.StaticSetRequest{
		API:      "sset",
		FQN:      api.FQN(fqn),
		Property: property,
		Value:    value,
	})

	if err != nil {
		panic(err)
	}
}

// Accepts pointers to structs that implement interfaces and searches for an
// existing object reference in the kernel. If it exists, it casts it to an
// objref for the runtime. Recursively casts types that may contain nested
// object references.
func castPtrToRef(data interface{}) interface{} {
	if data == nil {
		return data
	}

	client := kernel.GetClient()
	dataVal := reflect.ValueOf(data)

	switch dataVal.Kind() {
	case reflect.Map:
		result := api.WireMap{MapData: make(map[string]interface{})}

		iter := dataVal.MapRange()
		for iter.Next() {
			key := iter.Key().String()
			val := iter.Value().Interface()
			result.MapData[key] = castPtrToRef(val)
		}

		return result

	case reflect.Ptr:
		valref, valHasRef := client.FindObjectRef(reflect.ValueOf(data))
		if valHasRef {
			return api.ObjectRef{InstanceID: valref}
		}

	case reflect.Slice:
		refs := make([]interface{}, dataVal.Len())
		for i := 0; i < dataVal.Len(); i++ {
			refs[i] = dataVal.Index(i).Interface()
		}
		return refs

	case reflect.String:
		if enumRef, isEnumRef := client.Types().TryRenderEnumRef(dataVal); isEnumRef {
			return enumRef
		}
	}
	return data
}

// Casts slice of data into new slice of data with pointers to interfaces
// converted to objrefs. This is useful for casting arguments to methods and
// constructors to data that can be serialized before being passed over the
// wire.
func castPtrsToRef(args []interface{}) []interface{} {
	argRefs := make([]interface{}, len(args))
	for i, arg := range args {
		argRefs[i] = castPtrToRef(arg)
	}

	return argRefs
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
