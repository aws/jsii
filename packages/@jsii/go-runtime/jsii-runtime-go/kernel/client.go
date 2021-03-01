package kernel

import (
	"fmt"
	"reflect"
	"runtime"
	"sync"

	"github.com/aws/jsii-runtime-go/kernel/process"
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
	process *process.Process
	types   *typeregistry.TypeRegistry
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
	if process, err := process.NewProcess(fmt.Sprintf("^%s", version)); err != nil {
		return nil, err
	} else {
		result := &client{
			process: process,
			objects: make(map[reflect.Value]string),
			types:   typeregistry.NewTypeRegistry(),
		}

		// Register a finalizer to call Close()
		runtime.SetFinalizer(result, func(c *client) {
			c.close()
		})

		return result, nil
	}
}

func (c *client) Types() *typeregistry.TypeRegistry {
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

func (c *client) request(req kernelRequester, res kernelResponder) error {
	return c.process.Request(req, res)
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
	c.process.Close()

	// We no longer need a finalizer to run
	runtime.SetFinalizer(c, nil)
}
