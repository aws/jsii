package jsii

import (
	"fmt"
	"io/ioutil"
	"os"
	"reflect"
	"regexp"
)

// Maps interface types to their concrete implementation structs. Used by
// `castAndSetToPtr` to instantiate a concrete type that implements the
// the interface as dictated by the type of the ret value.
type implementationMap = map[reflect.Type]reflect.Type

// Load ensures a npm package is loaded in the jsii kernel.
func Load(name string, version string, tarball []byte) {
	client := getClient()

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

	_, err = client.load(loadRequest{
		API:     "load",
		Name:    name,
		Version: version,
		Tarball: tmpfile.Name(),
	})
	if err != nil {
		panic(err)
	}
}

// Create will construct a new JSII object within the kernel runtime. This is
// called by jsii object constructors.
func Create(fqn FQN, args []interface{}, interfaces []FQN, overrides []Override, ret interface{}) {
	client := getClient()

	res, err := client.create(createRequest{
		API:        "create",
		FQN:        fqn,
		Arguments:  castPtrsToRef(args),
		Interfaces: interfaces,
		Overrides:  overrides,
	})

	if err != nil {
		panic(err)
	}

	client.objects[ret] = res.InstanceID
}

// Invoke will call a method on a jsii class instance. The response should be
// decoded into the expected return type for the method being called.
func Invoke(obj interface{}, method string, args []interface{}, hasReturn bool, ret interface{}, implMap implementationMap) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	res, err := client.invoke(invokeRequest{
		API:       "invoke",
		Method:    method,
		Arguments: castPtrsToRef(args),
		ObjRef: objref{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	if hasReturn {
		castAndSetToPtr(ret, res.Result, implMap)
	}
}

// InvokeStatic will call a static method on a given jsii class. The response
// should be decoded into the expected return type for the method being called.
func InvokeStatic(fqn FQN, method string, args []interface{}, hasReturn bool, ret interface{}, implMap implementationMap) {
	client := getClient()

	res, err := client.sinvoke(staticInvokeRequest{
		API:       "sinvoke",
		FQN:       fqn,
		Method:    method,
		Arguments: castPtrsToRef(args),
	})

	if err != nil {
		panic(err)
	}

	if hasReturn {
		castAndSetToPtr(ret, res.Result, implMap)
	}
}

// Get reads a property value on a given jsii class instance. The response
// should be decoded into the expected type of the property being read.
func Get(obj interface{}, property string, ret interface{}, implMap implementationMap) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	res, err := client.get(getRequest{
		API:      "get",
		Property: property,
		ObjRef: objref{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	castAndSetToPtr(ret, res.Value, implMap)
}

// StaticGet reads a static property value on a given jsii class. The response
// should be decoded into the expected type of the property being read.
func StaticGet(fqn FQN, property string, ret interface{}, implMap implementationMap) {
	client := getClient()

	res, err := client.sget(staticGetRequest{
		API:      "sget",
		FQN:      fqn,
		Property: property,
	})

	if err != nil {
		panic(err)
	}

	castAndSetToPtr(ret, res.Value, implMap)
}

// Set writes a property on a given jsii class instance. The value should match
// the type of the property being written, or the jsii kernel will crash.
func Set(obj interface{}, property string, value interface{}) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	_, err := client.set(setRequest{
		API:      "set",
		Property: property,
		Value:    castPtrToRef(value),
		ObjRef: objref{
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
	client := getClient()

	_, err := client.sset(staticSetRequest{
		API:      "sset",
		FQN:      fqn,
		Property: property,
		Value:    value,
	})

	if err != nil {
		panic(err)
	}
}

func castValToRef(data interface{}) (objref, bool) {
	ref := objref{}
	ok := false
	dataVal := reflect.ValueOf(data)

	if dataVal.Kind() == reflect.Map {
		for _, k := range dataVal.MapKeys() {
			// Finding values type requires extracting from reflect.Value
			// otherwise .Kind() returns `interface{}`
			v := reflect.ValueOf(dataVal.MapIndex(k).Interface())

			if k.Kind() == reflect.String && k.String() == "$jsii.byref" && v.Kind() == reflect.String {
				ref.InstanceID = v.String()
				ok = true
			}

		}
	}

	return ref, ok
}

// Accepts pointers to structs that implement interfaces and searches for an
// existing object reference in the client. If it exists, it casts it to an
// objref for the runtime. Recursively casts types that may contain nested
// object references.
func castPtrToRef(data interface{}) interface{} {
	client := getClient()
	dataVal := reflect.ValueOf(data)

	if dataVal.Kind() == reflect.Ptr {
		valref, valHasRef := client.findObjectRef(data)
		if valHasRef {
			return objref{InstanceID: valref}
		}
	} else if dataVal.Kind() == reflect.Slice {
		refs := make([]interface{}, dataVal.Len())
		for i := 0; i < dataVal.Len(); i++ {
			refs[i] = dataVal.Index(i).Interface()
		}
		return refs
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

// castAndSetToPtr accepts a pointer to any type and attempts to cast the value
// argument to be the same type. Then it sets the value of the pointer element
// to be the newly cast data. This is used to cast payloads from JSII to
// expected return types for Get and Invoke functions.
func castAndSetToPtr(ptr interface{}, data interface{}, implMap implementationMap) {
	ptrVal := reflect.ValueOf(ptr).Elem()
	dataVal := reflect.ValueOf(data)

	ref, isRef := castValToRef(data)

	if ptrVal.Kind() == reflect.Slice && dataVal.Kind() == reflect.Slice {
		// If return type is a slice, recursively cast elements
		for i := 0; i < dataVal.Len(); i++ {
			innerType := ptrVal.Type().Elem()
			inner := reflect.New(innerType)

			castAndSetToPtr(inner.Interface(), dataVal.Index(i).Interface(), implMap)
			ptrVal.Set(reflect.Append(ptrVal, inner.Elem()))
		}
	} else if isRef {
		// If return data is JSII object references, add to objects table.
		concreteType := implMap[ptrVal.Type()]
		ptrVal.Set(reflect.New(concreteType))
		client := getClient()
		client.objects[ptrVal.Interface()] = ref.InstanceID
	} else {
		val := reflect.ValueOf(data)
		ptrVal.Set(val)
	}
}

// Close finalizes the runtime process, signalling the end of the execution to
// the jsii kernel process, and waiting for graceful termination. The best
// practice is to defer call thins at the beginning of the "main" function.
//
// If a jsii client is used *after* Close was called, a new jsii kernel process
// will be initialized, and Close should be called again to correctly finalize
// that, too. This behavior is intended for use in unit/integration tests.
func Close() {
	closeClient()
}
