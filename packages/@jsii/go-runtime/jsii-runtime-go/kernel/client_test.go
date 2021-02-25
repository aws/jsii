package kernel

import (
	"fmt"
	"testing"
)

func TestClient(t *testing.T) {
	client, err := newClient()
	if err != nil {
		t.Log(err)
		panic(fmt.Sprintf("Client init error: %s", err.Error()))
	}
	defer client.close()

	if client.RuntimeVersion == "" {
		t.Errorf("No client runtime version found. Client: %v", client)
	}

	t.Run("Client Load Error", func(t *testing.T) {
		request := LoadRequest{
			API:     "load",
			Name:    "jsii-calc",
			Version: "0.0.0",
			Tarball: "jsii-calc-tarball.tgz",
		}

		res, err := client.Load(request)

		t.Log(res)
		if err != nil {
			t.Log(err)
		}
	})
}
