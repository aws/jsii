package process

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"
)

// The child is a real process with the same handshake and exit protocol as Node.
func TestLifecycleChild(t *testing.T) {
	mode := os.Getenv("JSII_LIFECYCLE_CHILD")
	if mode == "" {
		t.Skip("child process entrypoint")
	}
	// The upstream TestMain creates this file before selecting a test.
	_ = os.Remove(mockRuntime)
	if mode == "bad-handshake" {
		fmt.Fprintln(os.Stdout, `{"hello":"invalid"}`)
	} else if mode != "no-handshake" {
		fmt.Fprintln(os.Stdout, `{"hello":"@mock/jsii-runtime@4.3.2"}`)
	}
	decoder := json.NewDecoder(os.Stdin)
	for {
		var request map[string]any
		if err := decoder.Decode(&request); err != nil {
			os.Exit(0)
		}
		if _, exit := request["exit"]; exit || mode == "crash" {
			fmt.Fprintln(os.Stderr, "child diagnostic")
			if mode == "nonzero" || mode == "crash" {
				os.Exit(7)
			}
			os.Exit(0)
		}
		if err := json.NewEncoder(os.Stdout).Encode(request); err != nil {
			os.Exit(8)
		}
	}
}

func TestLifecycle(t *testing.T) {
	// Do not parallelize this test: it temporarily replaces the global os.Stderr.
	for _, mode := range []string{"normal", "nonzero", "crash", "bad-handshake"} {
		t.Run(mode, func(t *testing.T) {
			p := newLifecycleProcess(t, mode)
			defer p.Close()
			// Exercise cleanup of the owned runtime directory with a custom child.
			directory := filepath.Join(t.TempDir(), "runtime")
			if err := os.Mkdir(directory, 0700); err != nil {
				t.Fatal(err)
			}
			p.tmpdir = directory
			cmd := p.cmd
			read, write, err := os.Pipe()
			if err != nil {
				t.Fatal(err)
			}
			previous := os.Stderr
			os.Stderr = write
			defer func() { os.Stderr = previous }()
			diagnostics := make(chan string, 1)
			go func() { body, _ := io.ReadAll(read); diagnostics <- string(body) }()
			var response EchoResponse
			err = p.Request(EchoRequest{Message: "ready"}, &response)
			wantError := mode == "crash" || mode == "bad-handshake"
			if (err != nil) != wantError {
				t.Errorf("request error = %v, want error %v", err, wantError)
			}
			if !wantError && response.Message != "ready" {
				t.Errorf("response = %q", response.Message)
			}
			var closers sync.WaitGroup
			for range 8 {
				closers.Add(1)
				go func() { defer closers.Done(); p.Close() }()
			}
			closers.Wait()
			if err := write.Close(); err != nil {
				t.Fatal(err)
			}
			output := <-diagnostics
			if err := read.Close(); err != nil {
				t.Fatal(err)
			}
			if !strings.Contains(output, "child diagnostic") {
				t.Errorf("diagnostics lost: %q", output)
			}
			wantCode := 0
			if mode == "nonzero" || mode == "crash" {
				wantCode = 7
			}
			if cmd.ProcessState == nil || cmd.ProcessState.ExitCode() != wantCode {
				t.Errorf("process state = %v, want exit %d", cmd.ProcessState, wantCode)
			}
			if wantCode != 0 && !strings.Contains(output, "exit status 7") {
				t.Errorf("missing failure diagnosis: %q", output)
			}
			if strings.Contains(output, "no child processes") || strings.Contains(output, "Wait was already called") {
				t.Errorf("duplicate wait: %q", output)
			}
			if _, err := os.Stat(directory); !os.IsNotExist(err) {
				t.Errorf("runtime directory remains: %v", err)
			}
			if err := p.Request(EchoRequest{}, &response); err == nil {
				t.Error("closed process accepted a request")
			}
		})
	}
}

func TestCloseDuringHandshake(t *testing.T) {
	p := newLifecycleProcess(t, "no-handshake")
	cmd := p.cmd
	stdout := p.stdout
	reader := &handshakeReader{Reader: stdout, reading: make(chan struct{})}
	p.responses = json.NewDecoder(reader)
	requestDone := make(chan struct{})
	var requestErr error
	go func() {
		defer close(requestDone)
		requestErr = p.Request(EchoRequest{Message: "ready"}, &EchoResponse{})
	}()
	t.Cleanup(func() {
		// Unblock startup even if the regression prevents Close from acquiring the lock.
		stdout.Close()
		p.Close()
		<-requestDone
	})

	select {
	case <-reader.reading:
	case <-requestDone:
		t.Fatalf("request returned before reading the handshake: %v", requestErr)
	case <-time.After(5 * time.Second):
		t.Fatal("request did not reach the handshake read")
	}

	closeDone := make(chan struct{})
	go func() {
		p.Close()
		close(closeDone)
	}()
	select {
	case <-closeDone:
	case <-time.After(5 * time.Second):
		t.Fatal("Close blocked while waiting for the handshake")
	}
	select {
	case <-requestDone:
		if requestErr == nil {
			t.Error("request succeeded without a handshake")
		}
	case <-time.After(5 * time.Second):
		t.Fatal("Close did not unblock the pending request")
	}
	if cmd.ProcessState == nil || cmd.ProcessState.ExitCode() != 0 {
		t.Errorf("process state = %v, want exit 0", cmd.ProcessState)
	}
}

// handshakeReader signals when startup begins reading the child's stdout.
type handshakeReader struct {
	io.Reader
	reading chan struct{}
	once    sync.Once
}

func (r *handshakeReader) Read(buffer []byte) (int, error) {
	r.once.Do(func() { close(r.reading) })
	return r.Reader.Read(buffer)
}

func newLifecycleProcess(t *testing.T, mode string) *Process {
	t.Helper()
	executable, err := os.Executable()
	if err != nil {
		t.Fatal(err)
	}
	t.Setenv(JSII_RUNTIME, executable)
	t.Setenv("JSII_LIFECYCLE_CHILD", mode)
	t.Setenv("GORACE", "atexit_sleep_ms=0")
	p, err := NewProcess("^4.3.2")
	if err != nil {
		t.Fatal(err)
	}
	// Run the child directly so Wait observes its exit status on every platform.
	p.cmd.Path = executable
	p.cmd.Args = []string{executable, "-test.run=^TestLifecycleChild$"}
	return p
}
