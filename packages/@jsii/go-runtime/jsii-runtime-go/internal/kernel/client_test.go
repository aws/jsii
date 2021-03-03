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

	t.Run("Client Load Error", func(t *testing.T) {
		request := LoadProps{
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
