package kernel

import (
	"bufio"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"reflect"
	"runtime"
	"sync"

	"github.com/aws/jsii-runtime-go/embedded"
	"github.com/aws/jsii-runtime-go/typeregistry"
)

var (
	clientInstance      *client
	clientInstanceMutex sync.Mutex
	clientOnce          sync.Once
)

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

	types   typeregistry.TypeRegistry
	objects map[reflect.Value]string
}

// GetClient returns a singleton client instance, initializing one the first
// time it is called.
func GetClient() *client {
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

// CloseClient finalizes the runtime process, signalling the end of the
// execution to the jsii kernel process, and waiting for graceful termination.
//
// If a jsii client is used *after* CloseClient was called, a new jsii kernel
// process will be initialized, and CloseClient should be called again to
// correctly finalize that, too.
func CloseClient() {
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
	clientinstance := &client{
		objects: make(map[reflect.Value]string),
		types:   typeregistry.NewTypeRegistry(),
	}

	// Register a finalizer to call Close()
	runtime.SetFinalizer(clientinstance, func(c *client) {
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

		entrypoint, err := embedded.ExtractRuntime(tmpdir)
		if err != nil {
			panic(err)
		}

		// --max-old-space-size is recommended to be set because `jsii` currently does not quite do
		// garbage collection (the kernel API only allows the host library to report object deleting,
		// but in order to be effective, the jsii kernel needs to also have a way to signal objects it
		// no longer has a reference to).
		clientinstance.process = exec.Command("node", "--max-old-space-size=4069", entrypoint)
	}

	clientinstance.process.Env = append(
		os.Environ(),
		fmt.Sprintf("JSII_AGENT=%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH),
	)

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

	stderr, err := clientinstance.process.StderrPipe()
	if err != nil {
		return nil, err
	}

	// Start a goroutine to process what comes in on that StderrPipe
	go func() {
		reader := bufio.NewReader(stderr)

		type consoleMessage struct {
			Stderr []byte `json:"stderr"`
			Stdout []byte `json:"stdout"`
		}

		eof := false
		for !eof {
			line, err := reader.ReadBytes('\n')
			if len(line) == 0 || err == io.EOF {
				eof = true
			}
			if len(line) > 0 {
				result := consoleMessage{}
				err := json.Unmarshal(line, &result)
				if err != nil {
					fmt.Fprintf(os.Stderr, "%s\n", line)
				} else {
					if result.Stderr != nil {
						os.Stderr.Write(result.Stderr)
					}
					if result.Stdout != nil {
						os.Stdout.Write(result.Stdout)
					}
				}
			}
		}
	}()

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

func (c *client) Types() typeregistry.TypeRegistry {
	return c.types
}

func (c *client) RegisterInstance(instance reflect.Value, instanceID string) error {
	instance = reflect.Indirect(instance)
	if instance.Kind() == reflect.Interface {
		instance = reflect.ValueOf(instance.Interface()).Elem()
	}

	if existing, found := c.objects[instance]; found && existing != instanceID {
		return fmt.Errorf("attempted to register %v as %s, but it was already registered as %s", instance, instanceID, existing)
	}

	var findAliases func(v reflect.Value) []reflect.Value
	findAliases = func(v reflect.Value) (res []reflect.Value) {
		v = reflect.Indirect(v)
		t := v.Type()
		numField := t.NumField()
		for i := 0; i < numField; i++ {
			f := t.Field(i)
			if f.Name == "_" {
				// Ignore any padding
				continue
			}
			if !f.Anonymous {
				// Ignore any non-anonymous field
				continue
			}
			fv := reflect.Indirect(v.Field(i))
			if fv.Kind() == reflect.Interface {
				fv = reflect.ValueOf(fv.Interface()).Elem()
			}

			res = append(res, fv)
			res = append(res, findAliases(fv)...)
		}
		return
	}

	aliases := findAliases(instance)
	for _, alias := range aliases {
		if existing, found := c.objects[alias]; found && existing != instanceID {
			return fmt.Errorf("value %v is embedded in %s, but was already assigned %s", alias, instanceID, existing)
		}
	}

	c.objects[instance] = instanceID
	for _, alias := range aliases {
		c.objects[alias] = instanceID
	}
	return nil
}

func (c *client) request(req kernelRequest, res kernelResponse) error {
	err := c.writer.Encode(req)
	if err != nil {
		return err
	}

	return c.response(res)
}

func (c *client) response(res kernelResponse) error {
	if c.reader.More() {
		return c.reader.Decode(res)
	}

	return errors.New("No Response from runtime")

}

func (c *client) FindObjectRef(obj reflect.Value) (refid string, ok bool) {
	obj = reflect.Indirect(obj)
	if obj.Kind() == reflect.Interface {
		obj = reflect.ValueOf(obj.Interface()).Elem()
	}
	refid, ok = c.objects[obj]
	return
}

func (c *client) close() {
	if c.process != nil {
		c.stdin.Write([]byte("{\"exit\":0}\n"))
		c.stdin.Close()
		c.process.Wait()
	}
	if c.tmpdir != "" {
		os.RemoveAll(c.tmpdir)
	}

	// We no longer need a finalizer to run
	runtime.SetFinalizer(c, nil)
}
