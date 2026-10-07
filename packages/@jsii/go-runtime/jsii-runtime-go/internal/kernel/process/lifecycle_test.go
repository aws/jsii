package process

import (
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"sync"
	"testing"
)

// The child is a real process with the same handshake and exit protocol as Node.
func TestLifecycleChild(t *testing.T) {
	mode := os.Getenv("JSII_LIFECYCLE_CHILD")
	if mode == "" {
		return
	}
	// The upstream TestMain creates this file before selecting a test.
	_ = os.Remove(mockRuntime)
	if mode == "bad-handshake" {
		fmt.Fprintln(os.Stdout, `{"hello":"invalid"}`)
	} else {
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
	for _, mode := range []string{"normal", "nonzero", "crash", "bad-handshake"} {
		t.Run(mode, func(t *testing.T) {
			executable, err := os.Executable()
			if err != nil {
				t.Fatal(err)
			}
			command := "exec '" + strings.ReplaceAll(executable, "'", "'\"'\"'") + "' -test.run=TestLifecycleChild"
			if runtime.GOOS == "windows" {
				command = `"` + executable + `" -test.run=TestLifecycleChild`
			}
			t.Setenv(JSII_RUNTIME, command)
			t.Setenv("JSII_LIFECYCLE_CHILD", mode)
			t.Setenv("GORACE", "atexit_sleep_ms=0")
			p, err := NewProcess("^4.3.2")
			if err != nil {
				t.Fatal(err)
			}
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
