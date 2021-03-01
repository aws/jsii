package kernel

import (
	"reflect"

	"github.com/aws/jsii-runtime-go/api"
)

const objectFQN = "Object"

func (c *client) ManageObject(v reflect.Value) (ref api.ObjectRef, err error) {
	// Using reflect.Indirect to ensure we see pointer-receiver methods, too.
	vt := reflect.Indirect(v).Type()
	interfaces, overrides := c.Types().DiscoverImplementation(vt)

	var resp CreateResponse
	resp, err = c.Create(CreateProps{
		FQN:        objectFQN,
		Interfaces: interfaces,
		Overrides:  overrides,
	})

	if err == nil {
		if err = c.objects.Register(v, resp.InstanceID); err == nil {
			ref.InstanceID = resp.InstanceID
		}
	}

	return
}
