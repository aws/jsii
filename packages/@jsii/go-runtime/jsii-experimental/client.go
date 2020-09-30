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
)

type Any interface{}

type client struct {
	process        *exec.Cmd
	RuntimeVersion string
	writer         *json.Encoder
	reader         *json.Decoder

	// Keeping track of state that'll need cleaning up in close()
	stdin  io.WriteCloser
	tmpdir string
}

func CheckFatalError(e error) {
	if e != nil {
		log.Fatal(e)
	}
}

// newClient starts the kernel child process and verifies the "hello" message
// was correct.
func newClient() (*client, error) {
	clientinstance := &client{}

	// Register a finalizer to call Close()
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

func (c *client) load(request LoadRequest) (LoadResponse, error) {
	response := LoadResponse{}
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
