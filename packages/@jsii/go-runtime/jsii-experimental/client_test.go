package jsii

import (
	"encoding/json"
	"fmt"
	"io"
	"testing"
)

func TestClient(t *testing.T) {
	client, err := InitClient()
	if err != nil {
		t.Log(err)
		t.Errorf(fmt.Sprintf("Client init error: %s", err.Error()))
	}

	if client.RuntimeVersion == "" {
		clientstr, _ := json.Marshal(&client)
		t.Errorf("No client runtime version found\nClient: %s", string(clientstr))
	}

	t.Run("Client Load Error", func(t *testing.T) {
		request := LoadRequest{
			Name:    "jsii-calc",
			Version: "0.0.0",
			Tarball: "jsii-calc-tarball.tgz",
		}

		_, err := client.load(request)

		if err != io.EOF {
			t.Log(err)
			requeststr, _ := json.Marshal(&request)
			t.Errorf("Library load failure\nRequest: %s", string(requeststr))
		}
	})
}
