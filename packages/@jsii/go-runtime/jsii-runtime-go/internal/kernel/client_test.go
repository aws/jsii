package kernel

import (
	"github.com/aws/jsii-runtime-go/internal/typeregistry"
	"reflect"
	"testing"
)

func TestClient(t *testing.T) {
	client, err := newClient()
	if err != nil {
		t.Fatalf("client init failed: %s", err.Error())
	}
	defer client.close()

	t.Run("Client Load Error", func(t *testing.T) {
		request := LoadProps{
			Name:    "jsii-calc",
			Version: "0.0.0",
		}

		res, err := client.Load(request, nil)

		t.Log(res)
		if err != nil {
			t.Log(err)
		}
	})

	t.Run("Type registry survives CloseClient()", func(t *testing.T) {
		client, err := newClient()
		if err != nil {
			t.Fatalf("client init failed: %s", err.Error())
		}

		// Clean up after ourselves, so this test does not leave traces behind.
		defer func() { types = typeregistry.New() }()

		type enumType string
		var enumTypeFOO enumType = "FOO"

		registry := client.Types()
		err = registry.RegisterEnum(
			"example.Enum",
			reflect.TypeOf((*enumType)(nil)).Elem(),
			map[string]interface{}{"FOO": enumTypeFOO},
		)
		if err != nil {
			t.Fatalf("failed registering enum: %s", err.Error())
		}

		CloseClient()

		// Getting the registry from the client again.
		registry = client.Types()

		if _, ok := registry.TryRenderEnumRef(reflect.ValueOf(enumTypeFOO)); !ok {
			t.Errorf("failed rendering enum ref, it should have worked!")
		}
	})
}
