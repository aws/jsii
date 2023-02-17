package process

import (
	_ "embed"
	"fmt"
	"io/ioutil"
	"os"
	"os/exec"
	"runtime"
	"strings"
	"testing"
)

//go:embed jsii-mock-runtime.js
var mockRuntimeSource []byte
var mockRuntime string

func TestMain(m *testing.M) {
	file, _ := ioutil.TempFile("", "jsii-mock-runtime.*.js")
	if _, err := file.Write(mockRuntimeSource); err != nil {
		panic(err)
	}
	file.Close()
	mockRuntime = file.Name()

	status := m.Run()

	// Clean up temporary file
	os.Remove(mockRuntime)

	os.Exit(status)
}

// TestVersionCheck ensures the version check logic works correctly. As a side
// benefit, it validates we are correctly launching custom JSII_RUNTIME processes
// as this relies on a mock implementation.
func TestVersionCheck(t *testing.T) {
	acceptedVersions := []string{"4.3.2", "4.3.1337", "4.1337.42"}

	for _, mockVersion := range acceptedVersions {
		t.Run(fmt.Sprintf("accepts version %v", mockVersion), func(t *testing.T) {
			oldJsiiRuntime := os.Getenv(JSII_RUNTIME)
			if runtime, err := makeCustomRuntime(mockVersion); err != nil {
				t.Fatal(err)
			} else {
				os.Setenv(JSII_RUNTIME, runtime)
			}
			defer os.Setenv(JSII_RUNTIME, oldJsiiRuntime)

			process, err := NewProcess(fmt.Sprintf("^4.3.2"))
			if err != nil {
				t.Fatal(err)
				return
			}
			defer process.Close()
			t.Logf("Subprocess command: %v", strings.Join(process.cmd.Args, " "))

			var (
				request  = EchoRequest{Message: "Oh, hi!"}
				response EchoResponse
			)
			if err := process.Request(request, &response); err != nil {
				t.Fatal(err)
			}
			if response.Message != request.Message {
				t.Errorf("Expected %v, received %v", request.Message, response.Message)
			}
		})
	}

	rejectedVersions := []string{"3.1337.42", "5.0.0-0", "4.3.2-pre.0", "4.3.3-pre.0"}

	for _, mockVersion := range rejectedVersions {
		t.Run(fmt.Sprintf("rejects version %v", mockVersion), func(t *testing.T) {
			oldJsiiRuntime := os.Getenv(JSII_RUNTIME)
			if runtime, err := makeCustomRuntime(mockVersion); err != nil {
				t.Fatal(err)
			} else {
				os.Setenv(JSII_RUNTIME, runtime)
			}
			defer os.Setenv(JSII_RUNTIME, oldJsiiRuntime)

			process, err := NewProcess("^4.3.2")
			if err != nil {
				t.Fatal(err)
				return
			}
			defer process.Close()
			t.Logf("Subprocess command: %v", strings.Join(process.cmd.Args, " "))

			var (
				request  = EchoRequest{Message: "Oh, hi!"}
				response EchoResponse
			)
			if err := process.Request(request, &response); err == nil {
				t.Errorf("expected an error, but no error received")
			} else if !strings.Contains(err.Error(), "incompatible runtime version") {
				t.Errorf("expected incompatible runtime version error, got %v", err.Error())
			}
		})
	}
}

func TestJSIINode(t *testing.T) {
	t.Run("successful node invocation", func(t *testing.T) {
		node, err := getNodePath()
		if err != nil {
			t.Fatal(err)
			return
		}

		oldJsiiNode := os.Getenv(JSII_NODE)
		os.Setenv(JSII_NODE, node)
		defer os.Setenv(JSII_NODE, oldJsiiNode)

		process, err := NewProcess("0.0.0")
		if err != nil {
			t.Fatal(err)
			return
		}
		defer process.Close()

		err = process.Request(TestRequest{"stats"}, &TestResponse{})
		if err != nil {
			t.Fatal(err)
			return
		}
	})

	t.Run("unsuccessful node invocation", func(t *testing.T) {
		oldJsiiNode := os.Getenv(JSII_NODE)
		os.Setenv(JSII_NODE, "./absolute-gibberish")
		defer os.Setenv(JSII_NODE, oldJsiiNode)

		process, err := NewProcess("0.0.0")
		if err != nil {
			t.Fatal(err)
			return
		}
		defer process.Close()

		if err := process.Request(TestRequest{"stats"}, &TestResponse{}); err == nil {
			t.Errorf("expected an error, but no error received")
		} else if !strings.Contains(err.Error(), "no such file or directory") && !strings.Contains(err.Error(), "file does not exist") {
			// We have 2 options here because Windows returns a different error message, of course...
			t.Errorf("expected 'no such file or directory' or 'file does not exist', got %v", err.Error())
		}
	})
}

type TestRequest struct {
	Api string `json:"api"`
}

type TestResponse struct {
}

type EchoRequest struct {
	Message string `json:"message"`
}

type EchoResponse struct {
	Message string `json:"message"`
}

func makeCustomRuntime(mockVersion string) (string, error) {
	node, err := getNodePath()
	if err != nil {
		return "", err
	}

	return fmt.Sprintf("%v %v %v", node, mockRuntime, mockVersion), nil
}

func getNodePath() (string, error) {
	var (
		node string
		err  error
	)
	if runtime.GOOS == "windows" {
		node, err = exec.LookPath("node.exe")
	} else {
		node, err = exec.LookPath("node")
	}

	return node, err
}
