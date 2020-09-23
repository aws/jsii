package jsii

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"path"
	"regexp"
	goruntime "runtime"
	"time"
)

// client is the data structure responsible for intializing and managing the
// JSII kernel process. It has handles for writing and reading JSON to/from
// the processes STDIN and STDOUT.
type client struct {
	process        *exec.Cmd
	RuntimeVersion string
	writer         *json.Encoder
	reader         *json.Decoder

	// Keeping track of the things we might have to clean up after ourselves...
	stdin  io.WriteCloser
	tmpdir string
}

// initClient starts the kernel child process and verifies that the runtime has
// intialized properly.
func initClient() (*client, error) {
	clientinstance := &client{}

	// Register a finalizer for this pointer
	goruntime.SetFinalizer(clientinstance, func(c *client) {
		c.close()
	})

	customruntime := os.Getenv("JSII_RUNTIME")
	if customruntime != "" {
		// The user has provided a custom JSII_RUNTIME, so we'll just honor that
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
		clientinstance.process = exec.Command("node", "--max-old-space-size=4096", entrypoint)
	}

	clientinstance.process.Env = append(
		os.Environ(),
		fmt.Sprintf("JSII_AGENT=%s/%s/%s", goruntime.Version(), goruntime.GOOS, goruntime.GOARCH),
	)

	clientinstance.process.Stderr = os.Stderr

	out, err := clientinstance.process.StdoutPipe()
	if err != nil {
		return nil, err
	}
	clientinstance.reader = json.NewDecoder(out)

	in, err := clientinstance.process.StdinPipe()
	if err != nil {
		return nil, err
	}
	clientinstance.stdin = in
	clientinstance.writer = json.NewEncoder(in)

	// Start Process
	if err := clientinstance.process.Start(); err != nil {
		return nil, err
	}

	// Check for OK response and parse runtime version
	rtver, err := clientinstance.validateClientStart()

	if err != nil {
		return nil, err
	}

	clientinstance.RuntimeVersion = rtver
	return clientinstance, nil
}

// request accepts a KernelRequest struct which is encoded into a JSON string
// and written to the kernel processess' STDIN. It also accepts a pointer to a
// struct that is used for the output.
func (c *client) request(req KernelRequest, res KernelResponse) error {
	err := c.writer.Encode(req)
	if err != nil {
		return err
	}

	return c.response(res)
}

// response attempts to read a json value from the kernel processess' STDOUT and
// decode it into the passed response struct. If no value is found on STDOUT and
// STDERR has content, it will read the output of STDERR and return an error
// with that content as the error message.
func (c *client) response(res KernelResponse) error {
	// TODO: identify source of this race condition
	// Runtime locks without this timeout currently
	time.Sleep(time.Millisecond * 100)
	if c.reader.More() {
		return c.reader.Decode(res)
	}

	return errors.New("No Response from runtime")
}

// validateClientStart verifies that the expected response is written to the
// process STDOUT after initialization. It parses the version of the kernel
// runtime returned on the initial output.
func (c *client) validateClientStart() (string, error) {
	response := InitOkResponse{}

	if err := c.response(&response); err != nil {
		return "", err
	}

	version := regexp.MustCompile("@").Split(response.Hello, 3)[2]
	return version, nil
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
