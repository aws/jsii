package jsii

import (
	"fmt"
	"io/ioutil"
	"os"
	"reflect"
	"regexp"
)

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

// RegisterClass associates a class fully qualified name to the specified struct
// type, and class interface. Panics if class is not a struct, iface is not an
// interface, or if the provided fqn was already used to register a different
// type.
func RegisterClass(fqn FQN, class reflect.Type, iface reflect.Type) {
	client := getClient()
	if err := client.types.registerClass(fqn, class, iface); err != nil {
		panic(err)
	}
}

// RegisterEnum associates an enum's fully qualified name to the specified enum
// type, and members. Panics if enum is not a reflect.String type, any value in
// the provided members map is of a type ofther than enum, or if the provided
// fqn was already used to register a different type.
func RegisterEnum(fqn FQN, enum reflect.Type, members map[string]interface{}) {
	client := getClient()
	if err := client.types.registerEnum(fqn, enum, members); err != nil {
		panic(err)
	}
}

// RegisterInterface associates an interface's fully qualified name to the
// specified interface type, and proxy struct. Panics if iface is not an
// interface, proxy is not a struct, or if the provided fqn was already used to
// register a different type.
func RegisterInterface(fqn FQN, iface reflect.Type, proxy reflect.Type) {
	client := getClient()
	if err := client.types.registerInterface(fqn, iface, proxy); err != nil {
		panic(err)
	}
}

// RegisterStruct associates a struct's fully qualified name to the specified
// struct type, and struct interface. Panics if strct is not a struct, iface is
// not an interface, or if the provided fqn was already used to register a
// different type.
func RegisterStruct(fqn FQN, strct reflect.Type, iface reflect.Type) {
	client := getClient()
	if err := client.types.registerStruct(fqn, strct, iface); err != nil {
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
func Invoke(obj interface{}, method string, args []interface{}, hasReturn bool, ret interface{}) {
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
		ObjRef: objectRef{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	if hasReturn {
		client.castAndSetToPtr(ret, res.Result)
	}
}

// StaticInvoke will call a static method on a given jsii class. The response
// should be decoded into the expected return type for the method being called.
func StaticInvoke(fqn FQN, method string, args []interface{}, hasReturn bool, ret interface{}) {
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
		client.castAndSetToPtr(ret, res.Result)
	}
}

// Get reads a property value on a given jsii class instance. The response
// should be decoded into the expected type of the property being read.
func Get(obj interface{}, property string, ret interface{}) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	res, err := client.get(getRequest{
		API:      "get",
		Property: property,
		ObjRef: objectRef{
			InstanceID: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	client.castAndSetToPtr(ret, res.Value)
}

// StaticGet reads a static property value on a given jsii class. The response
// should be decoded into the expected type of the property being read.
func StaticGet(fqn FQN, property string, ret interface{}) {
	client := getClient()

	res, err := client.sget(staticGetRequest{
		API:      "sget",
		FQN:      fqn,
		Property: property,
	})

	if err != nil {
		panic(err)
	}

	client.castAndSetToPtr(ret, res.Value)
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
		ObjRef: objectRef{
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

func castValToRef(data interface{}) (objectRef, bool) {
	ref := objectRef{}
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

func castValToEnumRef(data reflect.Value) (enum enumRef, ok bool) {
	ok = false

	if data.Kind() == reflect.Map {
		for _, k := range data.MapKeys() {
			// Finding values type requires extracting from reflect.Value
			// otherwise .Kind() returns `interface{}`
			v := reflect.ValueOf(data.MapIndex(k).Interface())

			if k.Kind() == reflect.String && k.String() == "$jsii.enum" && v.Kind() == reflect.String {
				enum.MemberFQN = v.String()
				ok = true
				return
			}
		}
	}

	return
}

// castValToMap attempts converting the provided jsii wire value to a
// go map. This recognizes the "$jsii.map" object and does the necessary
// recursive value conversion.
func (c *client) castValToMap(data reflect.Value, mapType reflect.Type) (m reflect.Value, ok bool) {
	ok = false

	if data.Kind() != reflect.Map || data.Type().Key().Kind() != reflect.String {
		return
	}

	if mapType.Kind() == reflect.Map && mapType.Key().Kind() != reflect.String {
		return
	}
	anyType := reflect.TypeOf((*interface{})(nil)).Elem()
	if mapType == anyType {
		mapType = reflect.TypeOf((map[string]interface{})(nil))
	}

	dataIter := data.MapRange()
	for dataIter.Next() {
		key := dataIter.Key().String()
		if key != "$jsii.map" {
			continue
		}

		// Finding value type requries extracting from reflect.Value
		// otherwise .Kind() returns `interface{}`
		val := reflect.ValueOf(dataIter.Value().Interface())
		if val.Kind() != reflect.Map {
			return
		}

		ok = true

		m = reflect.MakeMap(mapType)

		iter := val.MapRange()
		for iter.Next() {
			val := iter.Value().Interface()
			// Note: reflect.New(t) returns a pointer to a newly allocated t
			convertedVal := reflect.New(mapType.Elem())
			c.castAndSetToPtr(convertedVal.Interface(), val)

			m.SetMapIndex(iter.Key(), convertedVal.Elem())
		}
		return
	}
	return
}

// Accepts pointers to structs that implement interfaces and searches for an
// existing object reference in the client. If it exists, it casts it to an
// objref for the runtime. Recursively casts types that may contain nested
// object references.
func castPtrToRef(data interface{}) interface{} {
	if data == nil {
		return data
	}

	client := getClient()
	dataVal := reflect.ValueOf(data)

	switch dataVal.Kind() {
	case reflect.Map:
		result := wireMap{MapData: make(map[string]interface{})}

		iter := dataVal.MapRange()
		for iter.Next() {
			key := iter.Key().String()
			val := iter.Value().Interface()
			result.MapData[key] = castPtrToRef(val)
		}

		return result

	case reflect.Ptr:
		valref, valHasRef := client.findObjectRef(data)
		if valHasRef {
			return objectRef{InstanceID: valref}
		}

	case reflect.Slice:
		refs := make([]interface{}, dataVal.Len())
		for i := 0; i < dataVal.Len(); i++ {
			refs[i] = dataVal.Index(i).Interface()
		}
		return refs

	case reflect.String:
		if enumRef, isEnumRef := client.types.tryRenderEnumRef(dataVal); isEnumRef {
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

// castAndSetToPtr accepts a pointer to any type and attempts to cast the value
// argument to be the same type. Then it sets the value of the pointer element
// to be the newly cast data. This is used to cast payloads from JSII to
// expected return types for Get and Invoke functions.
func (c *client) castAndSetToPtr(ptr interface{}, data interface{}) {
	ptrVal := reflect.ValueOf(ptr).Elem()
	dataVal := reflect.ValueOf(data)

	// object refs
	if ref, isRef := castValToRef(data); isRef {
		// If return data is JSII object references, add to objects table.
		if concreteType, err := c.types.concreteTypeFor(ptrVal.Type()); err == nil {
			ptrVal.Set(reflect.New(concreteType))
			c.objects[ptrVal.Interface()] = ref.InstanceID
		} else {
			panic(err)
		}
		return
	}

	// enums
	if enumref, isEnum := castValToEnumRef(dataVal); isEnum {
		member, err := c.types.enumMemberForEnumRef(enumref)
		if err != nil {
			panic(err)
		}

		ptrVal.Set(reflect.ValueOf(member))
		return
	}

	// maps
	if m, isMap := c.castValToMap(dataVal, ptrVal.Type()); isMap {
		ptrVal.Set(m)
		return
	}

	// arrays
	if ptrVal.Kind() == reflect.Slice && dataVal.Kind() == reflect.Slice {
		// If return type is a slice, recursively cast elements
		for i := 0; i < dataVal.Len(); i++ {
			innerType := ptrVal.Type().Elem()
			inner := reflect.New(innerType)

			c.castAndSetToPtr(inner.Interface(), dataVal.Index(i).Interface())
			ptrVal.Set(reflect.Append(ptrVal, inner.Elem()))
		}

		return
	}

	if data != nil {
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
