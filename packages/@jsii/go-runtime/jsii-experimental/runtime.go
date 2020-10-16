package jsii

import (
	"fmt"
	"io/ioutil"
	"os"
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
func Create(fqn FQN, args []interface{}, interfaces []FQN, overrides []Override, returns interface{}) {
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

	client.objects[returns] = res.JsiiInstanceId
}

// Invoke will call a method on a jsii class instance. The response should be
// decoded into the expected return type for the method being called.
func Invoke(obj interface{}, method string, args []interface{}, returns interface{}) {
	client := getClient()

	// Find reference to class instance in client
	refid, found := client.findObjectRef(obj)

	if !found {
		panic("No Object Found")
	}

	_, err := client.invoke(invokeRequest{
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
}

func SInvoke(fqn FQN, method string, args []interface{}, returns interface{}) {
	client := getClient()

	_, err := client.sinvoke(staticInvokeRequest{
		Api:    "sinvoke",
		Fqn:    fqn,
		Method: method,
		Args:   args,
	})

	if err != nil {
		panic(err)
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
