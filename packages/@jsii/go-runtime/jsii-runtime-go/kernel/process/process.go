package process

import (
	"encoding/json"
	"fmt"
	"io"
	"io/ioutil"
	"os"
	"os/exec"
	"runtime"
	"strings"

	"github.com/Masterminds/semver/v3"
	"github.com/aws/jsii-runtime-go/embedded"
)

type Process interface {
	// Request starts the child process if that has not happened yet, then
	// encodes the supplied request and sends it to the child process
	// via the requests channel, then decodes the response into the provided
	// response pointer. If the process is not in a usable state, or if the
	// encoding fails, an error is returned.
	Request(request interface{}, response interface{}) error

	// Close cleans up any resources associated to this Process.
	// The Process can no longer be used for sending requests after
	// Close has been called.
	Close()
}

type process struct {
	compatibleVersions *semver.Constraints

	cmd    *exec.Cmd
	tmpdir string

	stdin  io.WriteCloser
	stdout io.ReadCloser
	stderr io.ReadCloser

	requests   *json.Encoder
	responses  *json.Decoder
	stderrDone chan bool

	started bool
	closed  bool
}

// NewProcess prepares a new child process, but does not start it yet. It will
// be automatically started whenever the client attempts to send a request
// to it.
func NewProcess(compatibleVersions string) (Process, error) {
	p := process{}

	if constraints, err := semver.NewConstraint(compatibleVersions); err != nil {
		return nil, err
	} else {
		p.compatibleVersions = constraints
	}

	if custom := os.Getenv("JSII_RUNTIME"); custom != "" {
		var (
			command string
			args    []string
		)
		// Sub-shelling in order to avoid having to parse arguments
		if runtime.GOOS == "windows" {
			// On windows, we use %COMSPEC% if set, or cmd.exe
			if cmd := os.Getenv("COMSPEC"); cmd != "" {
				command = cmd
			} else {
				command = "cmd.exe"
			}
			// The /d option disables Registry-defined AutoRun, it's safer to enable
			// The /s option tells cmd.exe the command is quoted as if it were typed into a prompt
			// The /c option tells cmd.exe to run the specified command and exit immediately
			args = []string{"/d", "/s", "/c", custom}
		} else {
			// On other OS'es, we use $SHELL and fall back to "/bin/sh"
			if shell := os.Getenv("SHELL"); shell != "" {
				command = shell
			} else {
				command = "/bin/sh"
			}
			args = []string{"-c", custom}
		}
		p.cmd = exec.Command(command, args...)
	} else if tmpdir, err := ioutil.TempDir("", "jsii-runtime.*"); err != nil {
		return nil, err
	} else {
		p.tmpdir = tmpdir
		if entrypoint, err := embedded.ExtractRuntime(tmpdir); err != nil {
			p.Close()
			return nil, err
		} else {
			p.cmd = exec.Command("node", entrypoint)
		}
	}

	// Setting up environment - if duplicate keys are found, the last value is used, so we are careful with ordering. In
	// particular, we are setting NODE_OPTIONS only if `os.Environ()` does not have another value... So the user can
	// control the environment... However, JSII_AGENT must always be controlled by this process.
	p.cmd.Env = append([]string{"NODE_OPTIONS=--max-old-space-size=4069"}, os.Environ()...)
	p.cmd.Env = append(p.cmd.Env, fmt.Sprintf("JSII_AGENT=%s/%s/%s", runtime.Version(), runtime.GOOS, runtime.GOARCH))

	if stdin, err := p.cmd.StdinPipe(); err != nil {
		p.Close()
		return nil, err
	} else {
		p.stdin = stdin
		p.requests = json.NewEncoder(stdin)
	}
	if stdout, err := p.cmd.StdoutPipe(); err != nil {
		p.Close()
		return nil, err
	} else {
		p.stdout = stdout
		p.responses = json.NewDecoder(stdout)
	}
	if stderr, err := p.cmd.StderrPipe(); err != nil {
		p.Close()
		return nil, err
	} else {
		p.stderr = stderr
	}

	return &p, nil
}

func (p *process) ensureStarted() error {
	if p.closed {
		return fmt.Errorf("this process has been closed")
	}
	if p.started {
		return nil
	}
	if err := p.cmd.Start(); err != nil {
		p.Close()
		return err
	}
	p.started = true

	done := make(chan bool, 1)
	go p.consumeStderr(done)
	p.stderrDone = done

	var handshake handshakeResponse
	if err := p.readResponse(&handshake); err != nil {
		p.Close()
		return err
	}

	if runtimeVersion, err := handshake.runtimeVersion(); err != nil {
		p.Close()
		return err
	} else if ok, errs := p.compatibleVersions.Validate(runtimeVersion); !ok {
		causes := make([]string, len(errs))
		for i, err := range errs {
			causes[i] = fmt.Sprintf("- %v", err)
		}
		p.Close()
		return fmt.Errorf("incompatible runtime version:\n%s", strings.Join(causes, "\n"))
	}

	return nil
}

// Request starts the child process if that has not happened yet, then
// encodes the supplied request and sends it to the child process
// via the requests channel, then decodes the response into the provided
// response pointer. If the process is not in a usable state, or if the
// encoding fails, an error is returned.
func (p *process) Request(request interface{}, response interface{}) error {
	if err := p.ensureStarted(); err != nil {
		return err
	}
	if err := p.requests.Encode(request); err != nil {
		p.Close()
		return err
	}
	return p.readResponse(response)
}

func (p *process) readResponse(into interface{}) error {
	if !p.responses.More() {
		return fmt.Errorf("no response received from child process")
	}
	return p.responses.Decode(into)
}

func (p *process) Close() {
	if p.closed {
		return
	}

	if p.stdin != nil {
		// Try to send the exit message, this might fail, but we can ignore that.
		p.stdin.Write([]byte("{\"exit\":0}\n"))

		// Close STDIN for the child process now.
		if err := p.stdin.Close(); err != nil {
			fmt.Fprintf(os.Stderr, "could not close child process' stdin: %v\n", err)
		}
		p.stdin = nil
	}

	if p.stdout != nil {
		// Close STDOUT for the child process now, as we don't expect to receive responses anymore.
		if err := p.stdout.Close(); err != nil {
			fmt.Fprintf(os.Stderr, "could not close child process' stdout: %v\n", err)
		}
		p.stdout = nil
	}

	if p.stderrDone != nil {
		// Wait for the stderr sink goroutine to have finished
		<-p.stderrDone
		p.stderrDone = nil
	}

	if p.stderr != nil {
		// Close STDERR for the child process now, as we're no longer consuming it anyway.
		if err := p.stderr.Close(); err != nil {
			fmt.Fprintf(os.Stderr, "could not close child process' stderr: %v\n", err)
		}
		p.stderr = nil
	}

	if p.tmpdir != "" {
		// Clean up any temporary directory we provisioned.
		if err := os.RemoveAll(p.tmpdir); err != nil {
			fmt.Fprintf(os.Stderr, "could not clean up temporary directory: %v\n", err)
		}
	}

	p.closed = true
}
