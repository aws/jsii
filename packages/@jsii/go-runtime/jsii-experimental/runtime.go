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

// rtRequest is the generic request/response function for the runtime instance.
func rtRequest(req KernelRequest, res KernelResponse) error {
	client := getClient()
	return client.request(req, res)
}

// Create will construct a new JSII object within the kernel runtime. This is
// called by jsii object constructors.
func Create(request CreateRequest) (CreateResponse, error) {
	response := CreateResponse{}
	err := rtRequest(request, &response)
	return response, err
}

// Get is used to access a property on a JSII object within the kernel runtime.
// This is called within getter methods.
func Get(request GetRequest) (GetResponse, error) {
	response := GetResponse{}
	err := rtRequest(request, &response)
	return response, err
}

// Set is used to write a property on a JSII object within the kernel runtime.
// This is called within setter methods.
func Set(request SetRequest) (SetResponse, error) {
	response := SetResponse{}
	err := rtRequest(request, &response)
	return response, err
}

// Invoke is used to call methods of JSII classes. It is called within the body
// of pointer receiver methods.
func Invoke(request InvokeRequest) (InvokeResponse, error) {
	response := InvokeResponse{}
	err := rtRequest(request, &response)
	return response, err
}

// StaticInvoke is used to invoke a class static method within the kernel
// process.
func StaticInvoke(request StaticInvokeRequest) (InvokeResponse, error) {
	response := InvokeResponse{}
	err := rtRequest(request, &response)
	return response, err
}

// StaticGet is used to access a static property on a JSII object within the kernel runtime.
// This is called within static getter methods.
func StaticGet(request StaticGetRequest) (GetResponse, error) {
	response := GetResponse{}
	err := rtRequest(request, &response)
	return response, err
}

// StaticSet is used to write a static property on a JSII object within the kernel runtime.
// This is called within static setter methods.
func StaticSet(request StaticSetRequest) (SetResponse, error) {
	response := SetResponse{}
	err := rtRequest(request, &response)
	return response, err
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
