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

	_, err = client.load(LoadRequest{
		Api:     "load",
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
func Create(fqn FQN, args []interface{}, interfaces []FQN, overrides []Override, returnsPtr interface{}) {
	client := getClient()
	res, err := client.create(createRequest{
		Api:        "create",
		Fqn:        fqn,
		Args:       args,
		Interfaces: interfaces,
		Overrides:  overrides,
	})

	if err != nil {
		panic(err)
	}

	client.objects[returnsPtr] = res.JsiiInstanceId
}

// Invoke will call a method on a jsii class instance. The response should be
// decoded into the expected return type for the method being called.
func Invoke(obj interface{}, method string, args []interface{}, returns bool, returnsPtr interface{}) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	res, err := client.invoke(invokeRequest{
		Api:    "invoke",
		Method: method,
		Args:   args,
		Objref: objref{
			JsiiInstanceId: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	if returns {
		castSetToPtr(returnsPtr, res.Result)
	}
}

func InvokeStatic(fqn FQN, method string, args []interface{}, returns bool, returnsPtr interface{}) {
	client := getClient()

	res, err := client.sinvoke(staticInvokeRequest{
		Api:    "sinvoke",
		Fqn:    fqn,
		Method: method,
		Args:   args,
	})

	if err != nil {
		panic(err)
	}

	if returns {
		castSetToPtr(returnsPtr, res.Result)
	}
}

func Get(obj interface{}, property string, returnsPtr interface{}) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	res, err := client.get(getRequest{
		Api:      "get",
		Property: property,
		Objref: objref{
			JsiiInstanceId: refid,
		},
	})

	if err != nil {
		panic(err)
	}

	castSetToPtr(returnsPtr, res.Value)
}

func StaticGet(fqn FQN, property string, returnsPtr interface{}) {
	client := getClient()

	res, err := client.sget(staticGetRequest{
		Api:      "sget",
		Fqn:      fqn,
		Property: property,
	})

	if err != nil {
		panic(err)
	}

	castSetToPtr(returnsPtr, res.Value)
}

func Set(obj interface{}, property string, value interface{}) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	_, err := client.set(setRequest{
		Api:      "set",
		Property: property,
		Value:    value,
		Objref: objref{
			JsiiInstanceId: refid,
		},
	})

	if err != nil {
		panic(err)
	}
}

func StaticSet(fqn FQN, property string, value interface{}) {
	client := getClient()

	_, err := client.sset(staticSetRequest{
		Api:      "sset",
		Fqn:      fqn,
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
				ref.JsiiInstanceId = v.String()
				ok = true
			}

		}
	}

	return ref, ok
}

// castSetToPtr accepts a pointer to any type and attempts to cast the value
// argument to be the same type. Then it sets the value of the pointer element
// to be the newly casted data. This is used to cast payloads from JSII to
// expected return types for Get and Invoke functions.
func castSetToPtr(ptr interface{}, data interface{}) {
	ptrVal := reflect.ValueOf(ptr).Elem()
	val := reflect.ValueOf(data)
	ptrVal.Set(val)
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
