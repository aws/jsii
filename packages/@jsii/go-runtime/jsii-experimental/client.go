package jsii

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"os"
	"os/exec"
	"path"
	"regexp"
	goruntime "runtime"
	"sync"
)

var (
	clientInstance      *client
	clientInstanceMutex sync.Mutex
	clientOnce          sync.Once
)

type Any interface{}

// The client struct owns the jsii child process and its io interfaces. It also
// owns a map (objects) that tracks all object references by ID. This is used
// to call methods and access properties on objects passed by the runtime
// process by reference.
type client struct {
	process        *exec.Cmd
	RuntimeVersion string
	writer         *json.Encoder
	reader         *json.Decoder

	// Keeping track of state that'll need cleaning up in close()
	stdin  io.WriteCloser
	tmpdir string

	objects map[interface{}]string
}

func CheckFatalError(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

// getClient returns a singleton client instance, initializing one the first
// time it is called.
func getClient() *client {
	clientOnce.Do(func() {
		// Locking early to be safe with a concurrent Close execution
		clientInstanceMutex.Lock()
		defer clientInstanceMutex.Unlock()

		client, err := newClient()
		if err != nil {
			panic(err)
		}

		clientInstance = client
	})

	return clientInstance
}

// closeClient finalizes the runtime process, signalling the end of the
// execution to the jsii kernel process, and waiting for graceful termination.
//
// If a jsii client is used *after* closeClient was called, a new jsii kernel
// process will be initialized, and closeClient should be called again to
// correctly finalize that, too.
func closeClient() {
	// Locking early to be safe with a concurrent getClient execution
	clientInstanceMutex.Lock()
	defer clientInstanceMutex.Unlock()

	// Reset the "once" so a new client would get initialized next time around
	clientOnce = sync.Once{}

	if clientInstance != nil {
		// Close the client & reset it
		clientInstance.close()
		clientInstance = nil
	}
}

// newClient starts the kernel child process and verifies the "hello" message
// was correct.
func newClient() (*client, error) {
	// Initialize map of object instances
	objmap := make(map[interface{}]string)

	clientinstance := &client{
		objects: objmap,
	}

	// Register a finalizer to call Close()
	goruntime.SetFinalizer(clientinstance, func(c *client) {
		c.close()
	})

	customruntime := os.Getenv("JSII_RUNTIME")
	if customruntime != "" {
		// The user has provided a custom JSII_RUNTIME, so we'll just honor that. This feature can
		// greatly help during development iterations or when trying to diagnose a user-discovered bug
		// that resists reproduction. The "built-in" runtime is webpack'd, and this can degrade the
		// debugger experience with certain debuggers (so far, only Chrome's was found to give the right
		// experience)
		clientinstance.process = exec.Command(customruntime)
	} else {
		// The user hasn't provided a custom JSII_RUNTIME, so we'll unpack the built-in one
		tmpdir, err := ioutil.TempDir("", "jsii-runtime.*")
		if err != nil {
			return nil, err
		}
		clientinstance.tmpdir = tmpdir

		for file, data := range embeddedruntime {
			filepath := path.Join(tmpdir, file)
			if err := ioutil.WriteFile(filepath, data, 0644); err != nil {
				return nil, err
			}
		}

		entrypoint := path.Join(tmpdir, embeddedruntimeMain)
		// --max-old-space-size is recommended to be set because `jsii` currently does not quite do
		// garbage collection (the kernel API only allows the host library to report object deleting,
		// but in order to be effective, the jsii kernel needs to also have a way to signal objects it
		// no longer has a reference to).
		clientinstance.process = exec.Command("node", "--max-old-space-size=4069", entrypoint)
	}

	clientinstance.process.Env = append(
		os.Environ(),
		fmt.Sprintf("JSII_AGENT=%s/%s/%s", goruntime.Version(), goruntime.GOOS, goruntime.GOARCH),
	)

	// Forward child process STDERR to this process' STDERR for immediate feedback
	clientinstance.process.Stderr = os.Stderr

	// Pipe child process STDIN from a JSON encoder
	in, err := clientinstance.process.StdinPipe()
	if err != nil {
		return nil, err
	}
	clientinstance.stdin = in
	clientinstance.writer = json.NewEncoder(in)

	// Pipe child process STDOUT to a JSON decoder
	out, err := clientinstance.process.StdoutPipe()
	if err != nil {
		return nil, err
	}
	clientinstance.reader = json.NewDecoder(out)

	// Start process
	if err := clientinstance.process.Start(); err != nil {
		return nil, err
	}

	// Check for "hello" message and parse runtime version
	rtversion, err := clientinstance.processHello()
	if err != nil {
		return nil, err
	}
	clientinstance.RuntimeVersion = rtversion

	return clientinstance, nil
}

func (c *client) request(req KernelRequest, res KernelResponse) error {
	err := c.writer.Encode(req)
	if err != nil {
		return err
	}

	return c.response(res)
}

func (c *client) response(res KernelResponse) error {
	if c.reader.More() {
		return c.reader.Decode(res)
	}

	return errors.New("No Response from runtime")

}

func (c *client) processHello() (string, error) {
	response := InitOkResponse{}

	if err := c.response(&response); err != nil {
		return "", err
	}

	parts := regexp.MustCompile("@").Split(response.Hello, 3)
	version := parts[len(parts)-1]
	return version, nil
}

func (c *client) findObjectRef(obj interface{}) (refid string, ok bool) {
	refid, ok = c.objects[obj]
	return
}

func (c *client) load(request LoadRequest) (LoadResponse, error) {
	response := LoadResponse{}
	return response, c.request(request, &response)
}

func (c *client) create(request createRequest) (createResponse, error) {
	response := createResponse{}
	return response, c.request(request, &response)
}

func (c *client) invoke(request invokeRequest) (invokeResponse, error) {
	response := invokeResponse{}
	return response, c.request(request, &response)
}

func (c *client) sinvoke(request staticInvokeRequest) (invokeResponse, error) {
	response := invokeResponse{}
	return response, c.request(request, &response)
}

func (c *client) get(request getRequest) (getResponse, error) {
	response := getResponse{}
	return response, c.request(request, &response)
}

func (c *client) sget(request staticGetRequest) (getResponse, error) {
	response := getResponse{}
	return response, c.request(request, &response)
}

func (c *client) set(request setRequest) (setResponse, error) {
	response := setResponse{}
	return response, c.request(request, &response)
}

func (c *client) sset(request staticSetRequest) (setResponse, error) {
	response := setResponse{}
	return response, c.request(request, &response)
}

func (c *client) close() {
	if c.process != nil {
		c.stdin.Close()
		c.process.Wait()
	}
	if c.tmpdir != "" {
		os.RemoveAll(c.tmpdir)
	}

	// We no longer need a finalizer to run
	goruntime.SetFinalizer(c, nil)
}
