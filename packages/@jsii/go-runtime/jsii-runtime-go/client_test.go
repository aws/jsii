package jsii

import (
	"encoding/json"
	"fmt"
	"testing"
)

func TestClient(t *testing.T) {
	client, err := newClient()
	if err != nil {
		t.Log(err)
		t.Errorf(fmt.Sprintf("Client init error: %s", err.Error()))
	}
	defer client.close()

	if client.RuntimeVersion == "" {
		clientstr, _ := json.Marshal(&client)
		t.Errorf("No client runtime version found\nClient: %s", string(clientstr))
	}

	t.Run("Client Load Error", func(t *testing.T) {
		request := loadRequest{
			API:     "load",
			Name:    "jsii-calc",
			Version: "0.0.0",
			Tarball: "jsii-calc-tarball.tgz",
		}

		res, err := client.load(request)

		t.Log(res)
		if err != nil {
			t.Log(err)
		}
	})
}
